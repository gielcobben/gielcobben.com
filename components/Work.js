import Project from "./Project";

const Work = ({ title, description, data, stars = [] }) => (
  <div>
    <section>
      <h2>{title}</h2>
      <p>{description}</p>
    </section>

    <div className="projects">
      {data &&
        data.map((project, index) => (
          <Project
            key={index}
            type={project.type}
            image={project.image}
            title={project.title}
            description={project.description}
            url={project.url}
            repo={project.repo}
            likes={project.likes}
            stars={stars.map(
              star => (star.name === project.name ? star.stars : ""),
            )}
          />
        ))}
    </div>

    <style jsx>{`
      section {
        padding-bottom: 0;
      }

      .projects {
        display: flex;
        flex-wrap: wrap;
        padding: 75px;
      }

      @media (max-width: 850px) {
        .projects {
          padding: 25px;
        }
      }
    `}</style>
  </div>
);

export default Work;
