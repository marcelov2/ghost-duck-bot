import { Message } from "discord.js";
import { ReactToContentCommand } from "../../interfaces/react-to-content-command";

const OWO: ReactToContentCommand = {
  name: "owo",
  pattern: /^.*o+[ ]*w+[ ]*o+.*$/i,
  description: `cada vez que alguien ponga "owo"  (o algo parecido) en un mensaje voy a mandar un gif`,
  exec: (message: Message) => {
    message.channel.send("https://media1.tenor.com/images/f5bc4d03d3c78d585508945daead8a7e/tenor.gif");
  }
};

export { OWO };