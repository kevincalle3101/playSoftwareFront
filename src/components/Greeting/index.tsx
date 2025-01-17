import { poppins } from "@/app/ui/fonts";
import months from "@/utils/months";

const Greeting: React.FC = () => {
  const date = new Date();
  const hours = date.getHours();
  date.setUTCHours(date.getUTCHours() - 5);

  const month = months[date.getMonth()];
  const today = `${date.getUTCDate()} de ${month} del ${date.getFullYear()}`;

  let greeting = "";

  if (hours > 0 && hours < 12) {
    greeting = "Buenos días";
  } else if (hours >= 12 && hours <= 18) {
    greeting = "Buenas tardes";
  } else {
    greeting = "Buenas noches";
  }

  return (
    <div className="py-7 px-10 max-sm:px-2 max-sm:py-3">
      <div className="max-lg:container flex justify-between items-center px-10">
        <h1 className={`text-white font-bold flex items-center gap-1 text-3xl max-sm:text-lg ${poppins.className}`}>
          <span className="max-sm:text-xl">&#128075;</span>
          {greeting}
        </h1>
        <div>
        <p className={`text-white font-semibold text-lg max-sm:text-sm ${poppins.className}`}>{today}</p>
        </div>
      </div>
    </div>
  );
};

export default Greeting;
