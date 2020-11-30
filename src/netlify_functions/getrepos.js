// Source: https://raw.githubusercontent.com/CallbacKiran/itsmine.ml/master/src/netlify_lambda/getrepos.js

const axios = require("axios");


exports.handler = (event, context, callback) => {
  const URL = `https://api.github.com/graphql`;
  const accessToken = process.env.GITHUB_API_KEY;
  const query = `
  query {
    user(login: "toheeb") {
      login
      name
      repositories(first: 20) {
        nodes {
          name
          description
          languages(first: 10) {
            nodes {
              name
            }
          }
        } 
      }
    }
  }`;

  const send = body => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(body)
    });
  };

  // Perform API call
  const getrepos = () => {
    axios({
      method: "POST",
      url: URL,
      data: JSON.stringify({ query }),
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(res => send(res.data.data.user))
      .catch(err => send(err));
  };

  // Make sure method is GET
  if (event.httpMethod == "GET") {
    // Run
    getrepos();
  }
};