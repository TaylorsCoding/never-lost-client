import React, { Component } from "react";
import { Route } from "react-router-dom";

import Title from "../Title/Title";
import TopNavbar from "../TopNavbar/TopNavbar";
import Home from "../Home/Home";
import Animals from "../Animals/Animals";
import Events from "../Events/Events";
import Chat from "../Chat/Chat";
import Organizations from "../Organizations/Organizations";
import AddEvent from "../AddEvent/AddEvent";
import EventPage from "../EventPage/EventPage";
import AddAnimal from "../AddAnimal/AddAnimal";
import AddTopic from "../AddTopic/AddTopic";
import AddOrganization from "../AddOrganization/AddOrganization";
import TopicPage from "../TopicPage/TopicPage";
import AnimalPage from "../AnimalPage/AnimalPage";
import OrganizationPage from "../OrganizationPage/OrganizationPage";

import config from "../../config";
import APIcontext from "../../APIcontext";

class App extends Component {
  state = {
    viewportWidth: 0,
    viewportHeight: 0,
    localArea: 45000,
    localEvents: [],
    localAnimals: [],
    localTopics: [],
    localPosts: [],
    localPictures: [],
    localOrganizations: [],
    globalEvents: [],
    globalAnimals: [],
    globalTopics: [],
    globalPosts: [],
    globalPictures: [],
    globalOrganizations: [],
    verification: false,
  };

  // Get area first

  // Get local events, animals, users,

  componentDidMount() {
    this.setState({ localArea: localStorage.getItem("local_zip") });
    this.setState({
      viewportWidth: Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      ),
      viewportHeight: Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      ),
    });
    // Promise.all([
    //   fetch(`${config.API_ENDPOINT}/topics/zip/${this.state.localArea}`),
    //   fetch(`${config.API_ENDPOINT}/animals/zip/${this.state.localArea}`),
    //   fetch(`${config.API_ENDPOINT}/events/zip/${this.state.localArea}`),
    //   fetch(`${config.API_ENDPOINT}/organizations/zip/${this.state.localArea}`),
    // ])
    //   .then(([topicsRes, animalsRes, eventsRes, orgsRes]) => {
    //     if (!topicsRes.ok)
    //       return topicsRes.json().then((e) => Promise.reject(e));
    //     if (!animalsRes.ok)
    //       return animalsRes.json().then((e) => Promise.reject(e));
    //     if (!eventsRes.ok)
    //       return eventsRes.json().then((e) => Promise.reject(e));
    //     if (!orgsRes.ok) return orgsRes.json().then((e) => Promise.reject(e));

    //     return Promise.all([
    //       topicsRes.json(),
    //       animalsRes.json(),
    //       eventsRes.json(),
    //       orgsRes.json(),
    //     ]);
    //   })
    //   .then(([localTopics, localAnimals, localEvents, localOrganizations]) => {
    //     this.setState({
    //       localTopics,
    //       localAnimals,
    //       localEvents,
    //       localOrganizations,
    //     });
    //   })
    //   .catch((error) => {
    //     console.error({ error });
    //   });

    Promise.all([
      fetch(`${config.API_ENDPOINT}/topics`),
      fetch(`${config.API_ENDPOINT}/animals`),
      fetch(`${config.API_ENDPOINT}/events`),
      fetch(`${config.API_ENDPOINT}/organizations`),
      fetch(`${config.API_ENDPOINT}/posts`),
    ])
      .then(([topicsRes, animalsRes, eventsRes, orgsRes, postRes]) => {
        if (!topicsRes.ok)
          return topicsRes.json().then((e) => Promise.reject(e));
        if (!animalsRes.ok)
          return animalsRes.json().then((e) => Promise.reject(e));
        if (!eventsRes.ok)
          return eventsRes.json().then((e) => Promise.reject(e));
        if (!orgsRes.ok) return orgsRes.json().then((e) => Promise.reject(e));
        if (!postRes.ok) return postRes.json().then((e) => Promise.reject(e));

        return Promise.all([
          topicsRes.json(),
          animalsRes.json(),
          eventsRes.json(),
          orgsRes.json(),
          postRes.json(),
        ]);
      })
      .then(
        ([
          globalTopics,
          globalAnimals,
          globalEvents,
          globalOrganizations,
          globalPosts,
        ]) => {
          this.setState({
            globalTopics,
            globalAnimals,
            globalEvents,
            globalOrganizations,
            globalPosts,
          });
        }
      )
      .catch((error) => {
        console.error({ error });
      });
  }

  componentDidUpdate() {
    if (this.state.localArea && !this.state.verification) {
      if (this.state.localArea.length === 5) {
        this.fetchData(this.state.localArea);
        this.setState({ verification: true });
      }
    }
  }

  fetchData = (zip) => {
    // Promise.all([fetch(`${config.API_ENDPOINT}/topics/zip/${zip}`)])
    //   .then(([topicsRes]) => {
    //     if (!topicsRes.ok)
    //       return topicsRes.json().then((e) => Promise.reject(e));
    //     return Promise.all([topicsRes.json()]);
    //   })
    //   .then(([localTopics]) => {
    //     this.setState({ localTopics });
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });

    Promise.all([
      fetch(`${config.API_ENDPOINT}/topics/zip/${zip}`),
      fetch(`${config.API_ENDPOINT}/animals/zip/${zip}`),
      fetch(`${config.API_ENDPOINT}/events/zip/${zip}`),
      fetch(`${config.API_ENDPOINT}/organizations/zip/${zip}`),
      fetch(`${config.API_ENDPOINT}/posts`),
    ])
      .then(([topicsRes, animalsRes, eventsRes, orgsRes, postsRes]) => {
        if (!topicsRes.ok)
          return topicsRes.json().then((e) => Promise.reject(e));
        if (!animalsRes.ok)
          return animalsRes.json().then((e) => Promise.reject(e));
        if (!eventsRes.ok)
          return eventsRes.json().then((e) => Promise.reject(e));
        if (!orgsRes.ok) return orgsRes.json().then((e) => Promise.reject(e));
        if (!postsRes.ok) return postsRes.json().then((e) => Promise.reject(e));

        return Promise.all([
          topicsRes.json(),
          animalsRes.json(),
          eventsRes.json(),
          orgsRes.json(),
          postsRes.json(),
        ]);
      })
      .then(
        ([
          localTopics,
          localAnimals,
          localEvents,
          localOrganizations,
          localPosts,
        ]) => {
          this.setState({
            localTopics,
            localAnimals,
            localEvents,
            localOrganizations,
            localPosts,
          });
        }
      )
      .catch((error) => {
        console.error({ error });
      });
  };

  handleAddAnimal = (animal) => {
    this.setState({ localAnimals: [...this.state.localAnimals, animal] });
  };

  handleAddEvent = (event) => {
    this.setState({ localEvents: [...this.state.localEvents, event] });
  };

  handleAddTopic = (topic) => {
    this.setState({ localTopics: [...this.state.localTopics, topic] });
  };

  handleAddPost = (post) => {
    this.setState({ localPosts: [...this.state.localPosts, post] });
  };

  handleAddOrganization = (organization) => {
    this.setState({
      localOrganizations: [...this.state.localOrganizations, organization],
    });
  };

  handleAddPicture = (picture) => {
    this.setState({ localPictures: [...this.state.localPictures, picture] });
  };

  handleDeleteUser = (userid) => {
    this.setState({
      localUsers: this.state.localUsers.filter((user) => user.id !== userid),
    });
  };

  handleDeleteAnimal = (animalid) => {
    this.setState({
      localAnimals: this.state.localAnimals.filter(
        (animal) => animal.id !== animalid
      ),
    });
  };

  handleDeleteEvent = (eventid) => {
    this.setState({
      localEvents: this.state.localEvents.filter(
        (event) => event.id !== eventid
      ),
    });
  };

  handleDeleteTopic = (topicid) => {
    this.setState({
      localTopics: this.state.localTopics.filter(
        (topic) => topic.id !== topicid
      ),
    });
  };

  handleDeletePost = (postid) => {
    this.setState({
      localPosts: this.state.localPosts.filter((post) => post.id !== postid),
    });
  };

  handleDeleteOrganization = (orgid) => {
    this.setState({
      localOrganizations: this.state.localOrganizations.filter(
        (org) => org.id !== orgid
      ),
    });
  };

  handleDeletePicture = (pictureid) => {
    this.setState({
      localPictures: this.state.localPictures.filter(
        (picture) => picture.id !== pictureid
      ),
    });
  };

  handleSetLocalArea = (val) => {
    this.setState({
      localArea: val,
    });
  };

  renderRoutes() {
    return (
      <>
        <Route exact path="/" component={Home} />
        <Route exact path="/animals" component={Animals} />
        <Route path="/events" component={Events} />
        <Route path="/chat" component={Chat} />
        <Route exact path="/organizations" component={Organizations} />
        <Route path="/create-event" component={AddEvent} />
        <Route path="/event/:event_id" component={EventPage} />
        <Route path="/create-animal" component={AddAnimal} />
        <Route path="/create-topic" component={AddTopic} />
        <Route path="/create-organization" component={AddOrganization} />
        <Route path="/topic/:topic_id" component={TopicPage} />
        <Route exact path="/animals/:animal_id" component={AnimalPage} />
        <Route
          exact
          path="/organizations/:org_id"
          component={OrganizationPage}
        />
      </>
    );
  }

  render() {
    const value = {
      localArea: this.state.localArea,
      localEvents: this.state.localEvents,
      localAnimals: this.state.localAnimals,
      localTopics: this.state.localTopics,
      localPosts: this.state.localPosts,
      localPictures: this.state.localPictures,
      localOrganizations: this.state.localOrganizations,
      globalEvents: this.state.globalEvents,
      globalAnimals: this.state.globalAnimals,
      globalTopics: this.state.globalTopics,
      globalPosts: this.state.globalPosts,
      globalPictures: this.state.globalPictures,
      globalOrganizations: this.state.globalOrganizations,
      setLocalArea: this.handleSetLocalArea,
      addEvent: this.handleAddEvent,
      addTopic: this.handleAddTopic,
      addAnimal: this.handleAddAnimal,
      addPost: this.handleAddPost,
      addOrganizaton: this.handleAddOrganization,
      addPicture: this.handleAddPicture,
      deleteEvent: this.handleDeleteEvent,
      deleteTopic: this.handleDeleteTopic,
      deleteAnimal: this.handleDeleteAnimal,
      deletePost: this.handleDeletePost,
      deleteOrganizaton: this.handleDeleteOrganization,
      deletePicture: this.handleDeletePicture,
    };

    return (
      <APIcontext.Provider value={value}>
        <div className="App">
          <Title />
          <TopNavbar />
          <main>{this.renderRoutes()}</main>
        </div>
      </APIcontext.Provider>
    );
  }
}

export default App;
