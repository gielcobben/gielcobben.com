const ListItem = ({ data }) => (
  <li>
    {data.url ? (
      <a href={data.url} target="_blank" rel="noopener noreferrer">
        <span className="title">{data.title}</span>
      </a>
    ) : (
      <span className="title">{data.title}</span>
    )}

    {data.description && (
      <span className="description">{data.description}</span>
    )}

    <style jsx>{`
      li {
        margin: 8px 0;
        display: flex;
      }

      a,
      .title {
        width: 350px;
      }

      .description {
        font-size: 14px;
        color: #666666;
      }

      @media (max-width: 850px) {
        li {
          display: block;
          margin: 16px 0;
        }

        span {
          display: block;
        }

        a,
        .title {
          width: auto;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    `}</style>
  </li>
);

export default ListItem;
