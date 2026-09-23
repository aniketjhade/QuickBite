import React from "react";
import User from "./User";
import UserClass from "./UserClass";
import UserContext from "../utils/UserContext";

class About extends React.Component {
  constructor(props) {
    super(props);
    // will be called first
    // console.log(" parent Constructor is called");
  }

  componentDidMount() {
    // console.log("parent did mount");
  }
  render() {
    // will be called second
    // console.log("Parent render is called");
    return (
      <div>
        <h1>About Page</h1>
        <div>
          <UserContext.Consumer>
            {({ loggedInUser }) => <h1> {loggedInUser}</h1>}
          </UserContext.Consumer>
        </div>
        <UserClass name={"First"} location={"Gondia"} />
      </div>
    );
  }
}

export default About;
