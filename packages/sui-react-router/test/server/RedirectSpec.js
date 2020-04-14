import {expect} from 'chai'
import React from 'react'
import {Route, Redirect, match} from '../../src'
import createMemoryHistory from '../../src/createMemoryHistory'

const getRedirectLocationFor = ({path = '/', withRoutes}) => {
  const history = createMemoryHistory(path)
  return new Promise(resolve => {
    match({routes: withRoutes, history}, (_, redirectLocation) =>
      resolve(redirectLocation)
    )
  })
}

describe('<Redirect>', () => {
  it('works with static paths', async () => {
    const withRoutes = <Redirect from="/" to="/es" />
    const redirectLocation = await getRedirectLocationFor({
      path: '/',
      withRoutes
    })
    expect(redirectLocation.pathname).to.equal('/es')
  })

  it('works with dynamic paths', async () => {
    const withRoutes = <Redirect from="/search/:id" to="/new-search/:id" />
    const redirectLocation = await getRedirectLocationFor({
      path: '/search/keyword',
      withRoutes
    })
    expect(redirectLocation.pathname).to.equal('/new-search/keyword')
  })

  it('works with relative paths', async () => {
    const withRoutes = (
      <Route path="search">
        <Redirect from="category" to="categories" />
      </Route>
    )
    const redirectLocation = await getRedirectLocationFor({
      path: '/search/category',
      withRoutes
    })
    expect(redirectLocation.pathname).to.equal('/search/categories')
  })
})
