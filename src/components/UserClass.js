import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      userData: {
        name: "Aniket Jhade",
        id: "QuickBite learner",
        avatar_url:
          "https://static.vecteezy.com/system/resources/thumbnails/008/687/818/small/food-delivery-logo-free-vector.jpg",
      },
    };

    // will be called third
    console.log(this.props.name + " " + "Constructor is called");
  }

  componentDidMount() {
    console.log(this.props.name + " " + "child did mount");
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
