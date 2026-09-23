import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      userData: {
        name: "Dummy",
        location: "default",
      },
    };

    // will be called third
    console.log(this.props.name + " " + "Constructor is called");
  }

  async componentDidMount() {
    console.log(this.props.name + " " + "child did mount");

    const data = await fetch("https://api.github.com/users/aniketjhade");

    const jsonData = await data.json();

    console.log(jsonData);

    this.setState({
      userData: jsonData,
    });
  }

  componentDidUpdate() {
    console.log("component did update");
  }

  componentWillUnmount() {
    console.log("Component will unmount");
  }

  render() {
    // will be called fourth
    console.log(this.props.name + " " + "render is called");
    const { name, avatar_url, id } = this.state.userData;
    // we can directly use debugger from code as well
    // debugger;
    return (
      <div className="user-card">
        <img src={avatar_url} />
        <h1>Name:{name}</h1>
        <h2>Addresss:{id}</h2>
        <h3>contact: 78409940980 </h3>
      </div>
    );
  }
}

export default UserClass;
