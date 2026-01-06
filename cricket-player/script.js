//const API_KEY = "f2bd4dab-38b1-4b7a-8de1-d456692a88e2";
import { SpeedInsights } from "@vercel/speed-insights/next"
const API_KEY="83f59d35-a0ac-4610-866a-9081e34aed21";
const BASE_URL = "https://api.cricapi.com/v1";

async function searchPlayers(query, dropdown) {
  if (query.length < 3) return;

  const res = await fetch(
    `${BASE_URL}/players?apikey=${API_KEY}&search=${query}`
  );
  const result = await res.json();

  dropdown.innerHTML = "";

  result.data.forEach((player) => {
    const option = document.createElement("option");
    option.value = player.id;
    option.textContent = player.name;
    dropdown.appendChild(option);
  });
}
const errorMsg = document.getElementById("errorMsg");

function showError(message) {
  errorMsg.textContent = message;
}

function clearError() {
  errorMsg.textContent = "";
}

const compareBtn = document.getElementById("compareBtn");

compareBtn.addEventListener("click", updateComparison);

async function fetchPlayerStats(playerId) {
  const res = await fetch(
    `${BASE_URL}/players_info?apikey=${API_KEY}&id=${playerId}`
  );
  const result = await res.json();
  if (result.status !== "success" || !Array.isArray(result.data?.stats)) {
    //console.error("Invalid API response", result);
    showError(result.message || "API limit exceeded. Please try again later.");
    return emptyPlayer();
  }
  clearError();
  const data = result.data;

  //   const testStats = data.stats && data.stats.test ? data.stats.test : {};

  console.log("Player stats raw:", data.stats);

  const statsArray = result.data.stats;

  // 👉 Extract TEST + BATTING stats
  const testBattingStats = statsArray.filter(
    (s) => s.fn === "batting" && s.matchtype === "test"
  );

  // 👉 Convert array → object
  const statMap = {};
  testBattingStats.forEach((s) => {
    statMap[s.stat] = s.value;
  });

  return {
    name: result.data.name,
    matches: Number(statMap.m || 0),
    runs: Number(statMap.runs || 0),
    average: Number(statMap.avg || 0),
    centuries: Number(statMap["100s"] || 0),
    halfCenturies: Number(statMap["50s"] || 0),
    highestScore: Number(statMap.hs || 0),
  };
}

function emptyPlayer() {
  return {
    name: "Stats not available",
    matches: 0,
    runs: 0,
    average: 0,
    centuries: 0,
    halfCenturies: 0,
    highestScore: 0,
  };
}

const table = document.getElementById("comparison");

function renderTable(p1, p2) {
  table.innerHTML = `
        <tr>
            <th>Statistic</th>
            <th>${p1.name}</th>
            <th>${p2.name}</th>
        </tr>
    `;

  const stats = [
    ["Matches", "matches"],
    ["Runs", "runs"],
    ["Average", "average"],
    ["Centuries", "centuries"],
    ["Half Centuries", "halfCenturies"],
    ["Highest Score", "highestScore"],
  ];

  stats.forEach(([label, key]) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${label}</td>
            <td class="${p1[key] > p2[key] ? "better" : ""}">${p1[key]}</td>
            <td class="${p2[key] > p1[key] ? "better" : ""}">${p2[key]}</td>
        `;
    table.appendChild(row);
  });
}

async function updateComparison() {
  // const id1 = document.getElementById("player1").value;
  // const id2 = document.getElementById("player2").value;
  console.log("Update comparison called");
  const id1 = player1.value;
  const id2 = player2.value;
  console.log("Selected IDs:", id1, id2);
  if (!id1 || !id2) {
    {
      showError("Please select both players.");
      return;
    }
  }

  const p1 = await fetchPlayerStats(id1);
  const p2 = await fetchPlayerStats(id2);
  if (!p1 || !p2) return;

  clearError();

  renderTable(p1, p2);
}

const search1 = document.getElementById("search1");
const search2 = document.getElementById("search2");
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");

search1.addEventListener("input", () => searchPlayers(search1.value, player1));

search2.addEventListener("input", () => searchPlayers(search2.value, player2));

// player1.addEventListener("change", updateComparison);
// player2.addEventListener("change", updateComparison);
