const API_KEY = "83f59d35-a0ac-4610-866a-9081e34aed21";
const BASE_URL = "https://api.cricapi.com/v1";

// Show API Limit Modal
function showApiLimitModal() {
  const modal = document.getElementById("apiLimitModal");
  modal.classList.remove("hidden");
}

// Close API Limit Modal
function closeApiLimitModal() {
  const modal = document.getElementById("apiLimitModal");
  modal.classList.add("hidden");
}

//Realtime search players

async function searchPlayers(query, dropdown) {
  if (query.length < 3) return;

  try {
    const res = await fetch(
      `${BASE_URL}/players?apikey=${API_KEY}&search=${query}`
    );
    const result = await res.json();

    // Check if API limit exceeded
    if (
      result.status === "failure" ||
      result.status === 429 ||
      (result.info && result.info.includes("API limit"))
    ) {
      showApiLimitModal();
      dropdown.innerHTML = '<option value="">Select Player</option>';
      return;
    }

    dropdown.innerHTML = '<option value="">Select Player</option>';

    if (!result.data || result.data.length === 0) return;

    result.data.forEach((player) => {
      const option = document.createElement("option");
      option.value = player.id; // 🔑 IMPORTANT: playerId
      option.textContent = player.name; // Visible name
      dropdown.appendChild(option);
    });
  } catch (err) {
    alert("Failed to search players");
  }
}
//Fetch player stats
async function fetchPlayerStats(playerId) {
  const res = await fetch(
    `${BASE_URL}/players_info?apikey=${API_KEY}&id=${playerId}`
  );
  const result = await res.json();

  if (result.status !== "success") {
    throw new Error(result.message || "API limit exceeded");
  }

  const statsArray = result.data.stats;

  const testBatting = statsArray.filter(
    (s) => s.fn === "batting" && s.matchtype === "test"
  );

  const map = {};
  testBatting.forEach((s) => (map[s.stat] = s.value));

  return {
    name: result.data.name,
    matches: Number(map.m || 0),
    runs: Number(map.runs || 0),
    average: Number(map.avg || 0),
    centuries: Number(map["100s"] || 0),
    halfCenturies: Number(map["50s"] || 0),
    highestScore: Number(map.hs || 0),
  };
}

//compare players
async function comparePlayers() {
  const id1 = document.getElementById("player1").value;
  const id2 = document.getElementById("player2").value;

  if (!id1 || !id2) {
    alert("Please select both players");
    return;
  }

  try {
    const p1 = await fetchPlayerStats(id1);
    const p2 = await fetchPlayerStats(id2);

    document.getElementById("player1Name").textContent = p1.name;
    document.getElementById("player2Name").textContent = p2.name;

    const statsBody = document.getElementById("statsBody");
    statsBody.innerHTML = "";

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
              <td class="stat-label">${label}</td>
              <td class="${p1[key] > p2[key] ? "highest-value" : ""}">${
        p1[key]
      }</td>
              <td class="${p2[key] > p1[key] ? "highest-value" : ""}">${
        p2[key]
      }</td>
            `;
      statsBody.appendChild(row);
    });

    document.getElementById("comparisonResult").classList.remove("hidden");
  } catch (err) {
    alert(err.message);
  }
}

//Events
search1.addEventListener("input", () => searchPlayers(search1.value, player1));
search2.addEventListener("input", () => searchPlayers(search2.value, player2));

document.addEventListener("keypress", (e) => {
  if (e.key === "Enter") comparePlayers();
});
