import "./styles.scss";
import { useEffect, useState } from "react";

export const Header = () => {
  return (
    <header>
      <h1 id="heading">Türkiye Son Depremler</h1>
      <h4>Geçmiş Olsun Türkiye</h4>
    </header>
  );
};

export const EarthQuakeNode = ({ title, date_day, date_hour, mag, depth }) => {
  function reverseString(str) {
    // Step 1. Use the split() method to return a new array
    var splitString = str.split("-"); // var splitString = "hello".split("");
    // ["h", "e", "l", "l", "o"]

    // Step 2. Use the reverse() method to reverse the new created array
    var reverseArray = splitString.reverse(); // var reverseArray = ["h", "e", "l", "l", "o"].reverse();
    // ["o", "l", "l", "e", "h"]

    // Step 3. Use the join() method to join all elements of the array into a string
    var joinArray = reverseArray.join("/"); // var joinArray = ["o", "l", "l", "e", "h"].join("");
    // "olleh"

    //Step 4. Return the reversed string
    return joinArray; // "olleh"
  }
  return (
    <div className="container">
      <h2 className="title">{title}</h2>
      <hr />
      <div className="infos">
        <section className="infobox1">
          <p>
            Büyüklük: <span className="size">{mag}</span>
          </p>
          <p>Derinlik: {depth} km</p>
        </section>
        <section className="infobox2">
          <p>Saat: {date_hour}</p>
          <p>Tarih: {reverseString(date_day)}</p>
        </section>
      </div>
    </div>
  );
};

export default function App() {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch("https://api.orhanaydogdu.com.tr/deprem/kandilli/live?limit=30")
      .then((response) => response.json())
      .then((data) => setList(data.result));
  }, []);

  return (
    <div className="App">
      <Header />
      <h5>En Son:</h5>
      <>
        {list.map((node) => {
          let id = node.earthquake_id;
          return (
            <EarthQuakeNode
              key={id}
              title={node.title}
              date_day={node.date_day}
              date_hour={node.date_hour}
              mag={node.mag}
              depth={node.depth}
            />
          );
        })}
      </>
      <footer>
        <p>
          Bu web sitesi bilgilendirme amaçlı oluşturulmuş olup herhangi bir
          ticari amaç barındırmamaktadır. Bu sitedeki deprem raporları{" "}
          <a href="http://www.koeri.boun.edu.tr/scripts/lst0.asp">
            Kandilli Rasathanesi ve Deprem Araştırma Enstitüsü
          </a>{" "}
          kaynak alınarak{" "}
          <a href="mailto:berksysl.g@gmail.com">Tahaberk SOYSAL</a> tarafından
          hazırlanmıştır.
          <br />
          <br />
          "Türk Milletinin Başı Sağolsun"
        </p>
      </footer>
    </div>
  );
}
