import "isomorphic-fetch";
import Head from "next/head";

import List from "../components/List";
import Work from "../components/Work";
import Intro from "../components/Intro";
import Layout from "../components/Layout";

import awards from "../content/awards";
import social from "../content/social";
import opensource from "../content/opensource";
import experience from "../content/experience";

const transform = data => {
  const shots = [];

  data.map(item => {
    shots.push({
      type: "dribbble",
      image: item.images.hidpi,
      title: item.title,
      description: item.description,
      url: item.html_url,
      repo: item.updated_at,
      likes: item.likes_count
    });
  });

  return shots;
};

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      repos: [
        "gielcobben/caption",
        "gielcobben/caption-core",
        "vernondegoede/verminal",
        "vernondegoede/nonbilight"
      ],
      stars: [],
      shots: []
    };
  }

  async componentDidMount() {
    const { repos } = this.state;

    repos.map(async repo => {
      const githubReq = await fetch(`https://api.github.com/repos/${repo}`);
      const githubJSON = await githubReq.json();
      const { name, stargazers_count } = githubJSON;

      const stars = [
        ...this.state.stars,
        {
          name,
          stars: stargazers_count
        }
      ];

      this.setState({
        stars
      });
    });
  }

  render() {
    const { stars, shots } = this.state;

    return (
      <Layout>
        <Intro />
        {/* <Work
          title="Work"
          description="Because Open Source plays a major part in how we build our products, we
        see it as a matter of course to give the same effort back to our community
        by creating valuable, free and easy-to-use software."
          data={shots}
        /> */}
        <Work title="Open source software" data={opensource} stars={stars} />
        <List title="Awards" data={awards} />
        <List title="Experience" data={experience} />
        <List title="Contact" data={social} />
      </Layout>
    );
  }
}

export default Index;
