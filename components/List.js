import ListItem from "../components/ListItem";

const List = ({ title, data }) => (
  <section>
    <ul>
      {data.map((entry, index) => (
        <ListItem key={index} data={entry} />
      ))}
    </ul>

    <style jsx>{`
      h2 {
        margin-bottom: 32px;
      }
    `}</style>
  </section>
);

export default List;
