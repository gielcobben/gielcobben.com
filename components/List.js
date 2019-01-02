import ListItem from "../components/ListItem";

const List = ({ title, data }) => (
  <section>
    <h2>{title}</h2>
    <ul>{data.map((entry, index) => <ListItem key={index} data={entry} />)}</ul>

    <style jsx>{`
      h2 {
        margin-bottom: 32px;
      }
    `}</style>
  </section>
);

export default List;
