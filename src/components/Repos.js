import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
// import ChartComponent from './Charts/ExampleChart'

const Repos = () => {
  const { repos } = React.useContext(GithubContext);
  // for reduce we pass in callback function and the second thing is what we are trying to return
  // from the reduce. we have callback function and we are going to return an oject
  // we are going to return total and the exact itiration
  const languages = repos.reduce((total, item) => {
    const { language, stargazers_count } = item;
    if (!language) {
      return total;
    }
    // if total doesn't exist. create a new language and make it equal to 1. after first instance 
    // you'll just be adding one for each instance of language
    if (!total[language]) {
      total[language] = { label: language, value: 1, stars: stargazers_count };
    } else {
      total[language] = {
        ...total[language], value: total[language].value + 1,
        stars: total[language].stars + stargazers_count,
      };
    }
    // creating property dynamically on the oject


    return total
  }, {});

  //}, { CSS: 10 });
  // below creates an array of the instances of languages that we then sort from highest to lowest
  // b represents the object. we slice() out the first five languages because we want to limit output to
  // the chart to 5
  const mostUsed = Object.values(languages).sort((a, b) => {
    return b.value - a.value;
  })
    .slice(0, 5);

  // most stars per language

  const mostPopular = Object.values(languages).sort((a, b) => {
    return b.stars - a.stars
  }).map((item) => {
    return { ...item, value: item.stars }
  }).slice(0, 5);

  // stars forks
  // always return total with reduce or nothing will happen
  // we're returning objects whos properties are objects as well
  let { stars, forks } = repos.reduce((total, item) => {
    const { stargazers_count, name, forks } = item
    total.stars[stargazers_count] = {
      label: name,
      value: stargazers_count
    }
    total.forks[forks] = {
      label: name,
      value: forks,
    }
    return total
  }, {
    stars: {}, forks: {}
  })
  stars = Object.values(stars).slice(-5).reverse();
  forks = Object.values(forks).slice(-5).reverse();


  return <section className='section'>
    <Wrapper className='section-center'>
      <Pie3D data={mostUsed} />
      <Column3D data={stars} />
      <Doughnut2D data={mostPopular} />
      <Bar3D data={forks} />
    </Wrapper>
  </section>

};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
      grid - template - columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
      grid - template - columns: 2fr 3fr;
  }

  div {
      width: 100% !important;
  }
  .fusioncharts-container {
      width: 100% !important;
  }
  svg {
      width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
