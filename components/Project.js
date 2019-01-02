const Project = ({
  type,
  image,
  title,
  description,
  url,
  repo,
  stars,
  likes,
}) => (
  <div className={`project ${type === "open-source" ? "os" : "dribbble"}`}>
    <a href={url} target="_blank">
      <figure>
        <img src={image} draggable="false" />
      </figure>

      <div className="info">
        <h3>{title}</h3>
        <p
          dangerouslySetInnerHTML={{
            __html: `${description.substring(0, 30)}...`,
          }}
        />
      </div>

      <div className="footer">
        <span>{repo}</span>
        {stars.length > 0 && <span>{stars} ★</span>}
        {likes && <span>{likes} ♥</span>}
      </div>
    </a>

    <style jsx>{`
      .project {
        width: 320px;
        padding: 25px;
      }

      a {
        border-radius: 6px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        transition: border 0.2s ease-out;
      }

      a:hover {
        opacity: 1;
        border: 1px solid rgba(255, 255, 255, 1);
      }

      figure {
        width: 100%;
        min-height: 150px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        display: flex;
        align-items: center;
      }

      img {
        display: block;
        margin: 0 auto;
      }

      .os img {
        width: 80px;
      }

      .dribbble img {
        width: 100%;
      }

      .info {
        padding: 16px;
      }

      p {
        font-size: 14px;
        margin: 0;
      }

      .footer {
        padding: 16px;
        flex: 1;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        font-size: 13px;
      }

      .footer span:first-child {
        color: rgba(255, 255, 255, 0.5);
      }

      @media (max-width: 850px) {
        .project {
          width: 50%;
        }
      }

      @media (max-width: 500px) {
        .project {
          width: 100%;
        }
      }
    `}</style>
  </div>
);

export default Project;
