import { Message } from "discord.js";

import { ReactToContentCommand } from "../../interfaces/react-to-content-command";

const UWU: ReactToContentCommand = {
  name: "uwu",
  pattern: /^.*u+[ ]*w+[ ]*u+.*$/i,
  description: `cada vez que alguien ponga "uwu"  (o algo parecido) en un mensaje voy a mandar un gif`,
  exec: (message: Message) => {
        message.channel.send("https://media.tenor.com/images/da03e7732c014219614dd7c03674f468/tenor.gif");
  }
};

export { UWU };