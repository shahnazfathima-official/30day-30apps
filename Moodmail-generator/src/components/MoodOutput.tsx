import { Input } from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import { Textarea} from "@/components/ui/textarea"

type Props = {
    subject: string,
    footer: string,
    onReset: () => void
}


const MoodOutput = ({subject, footer, onReset}: Props) => {
  const handleCopy = () => {
    const text = `Subject: ${subject}\nFooter: ${footer}`;
    navigator.clipboard.writeText(text);
  };
  return (
    <div>
      <div>
        <label className="block font-medium">Subject:</label>
        <Input value={subject} readOnly />
      </div>
      <div>
        <label className="block font-medium">Footer Signature:</label>
        <Textarea value={footer} readOnly />
      </div>

    
        <Button variant="default" className="w-full mt-4" onClick={handleCopy}>
          Copy to Clipboard
        </Button>
        <Button variant="destructive" className="w-full mt-4" onClick={onReset}>
          Reset
        </Button>
      
    </div>
  )
}

export default MoodOutput