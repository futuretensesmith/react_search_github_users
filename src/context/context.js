import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

// invoke GitHubContext in any component will give you access to value property 
// of GithubProvider 

const GithubContext = React.createContext()

// after we invoke createContext() we have access to two components
// Provider, Consumer. We can access them by GithubContext.Provider or GithubContext.Consumer
// with useContext hook we can skip the Consumer. 
// we will render all our applications by passing in children 
// whatever we pass into value will be accessible to entire application. helps
// eliminate need for prop drilling

const GithubProvider = ({ children }) => {
    const [githubUser, setGithubUser] = useState(mockUser);
    const [repos, setRepos] = useState(mockRepos);
    const [followers, setFollowers] = useState(mockFollowers);
    // request loading
    const [requests, setRequests] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    //error
    const [error, setError] = useState({ show: false, msg: '' });

    const searchGithubUser = async (user) => {
        // don't have to pass in false when we invoke toggleError() because the defaults are already
        // set to false down in the function --> function toggleError(show = false, msg = '')
        toggleError()
        setIsLoading(true)
        const response = await axios(`${rootUrl}/users/${user}`).catch(err => console.log(err));
        //console.log(response)
        if (response) {
            setGithubUser(response.data)
            const { login, followers_url } = response.data;
            // once promises are settled we then pass in reults
            await Promise.allSettled([axios(`${rootUrl}/users/${login}/repos?per_page=100`),
            axios(`${followers_url}?per_page=100`)]).then((results) => {
                const [repos, followers] = results;
                const status = 'fulfilled';
                if (repos.status === status) {
                    setRepos(repos.value.data)
                }
                if (followers.status === status) {
                    setFollowers(followers.value.data)
                }

            }).catch(err => console.log(err));
        } else {
            toggleError(true, 'there is no user with that username')
        }
        checkRequests();
        setIsLoading(false)
    }
    //check rate
    const checkRequests = () => {
        // axios returns a promise with the data (some people name data response) from the api then executes callback function when resolved
        // using axios instead of fetch. don't need to run .JSON() method
        // destructering data here pulls out the nested object that's also called data if you remove
        // curlys and console.log(data) you'll see what I mean future me
        axios(`${rootUrl}/rate_limit`).then(({ data }) => {
            let { rate: { remaining } } = data;
            // uncommit remaining = 0 to test error
            //remaining = 0
            setRequests(remaining)
            if (remaining === 0) {
                // throw error
                toggleError(true, 'Sorry, you have exceeded your hourly search limit.')
            }
        })
            .catch((err) => console.log(err))
    };
    function toggleError(show = false, msg = '') {
        setError({ show, msg })
    }

    //error
    // empty dependency array because it is going to run only once
    useEffect(checkRequests, [])

    return <GithubContext.Provider value={{
        githubUser, repos, followers, requests, error, searchGithubUser, isLoading,
    }}>{children}</GithubContext.Provider>
}

export { GithubProvider, GithubContext };