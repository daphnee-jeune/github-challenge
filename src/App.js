import React, { useState, useEffect } from 'react'
import './App.css'

const App = () => {

  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [starsCount, setStarsCount] = useState(0)
  const [forksCount, setForksCount] = useState(0)
  const [open, setOpen] = useState(true)

  useEffect(() => {
    const API_URL = `https://api.github.com/search/repositories?q=stars:%3E25000&sort=stars&order=desc`

    const fetchData = () => {
      fetch(API_URL)
      .then(res => res.json())
      .then(res => {
        setRepos(res.items)
        setStarsCount(res.items.stargazers_count)
        setForksCount(res.items.forks_count)
        setLoading(false)
      })
    }

    fetchData()
  }, [])

  const details = open && repos.map(repo => {
    return (
          <div key={repo.id} className="details">
              <h1 className="repo__name">{repo.name}</h1>
              <span className="stargazers__count">{repo.stargazers_count}</span>
              <span className="forks__count">{repo.forksCount}</span>
              <div className="repo__url">{repo.html_url}</div>
          </div>
      )
  })

  const reposList = !loading && repos.map(repo => {
    return (
      <div key={repo.id} className="repo">
        <div key={Math.random(Math.floor() * 50)} className="repo__name">{repo.name}</div>
        <div className="stargazerz__count">{repo.stargazers_count}</div>
        <button className="details__btn">View Details</button>
      </div>
    )
  })

  return (
    <div className="app">
      {loading && <div className="loading">Loading...</div>}
      {reposList}
      {open && details}
    </div>
  )
}

export default App
