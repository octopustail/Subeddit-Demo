import fetch from 'cross-fetch'

/// / user actions
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';

export function selectSubreddit(subreddit) {
    return {
        type: SELECT_SUBREDDIT,
        subreddit
    }
}

export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';

export function invalidateSubreddit(subreddit) {
    return {
        type: INVALIDATE_SUBREDDIT,
        subreddit
    }
}

//posts actions

export const REQUEST_POSTS = 'REQUEST_POSTS';

export function requestPosts(subreddit) {
    return {
        type: REQUEST_POSTS,
        subreddit
    }
}

export const RECEIVE_POSTS = 'RECEIVE_POSTS';

export function receivePosts(subreddit, json) {
    return {
        type: RECEIVE_POSTS,
        subreddit,
        posts: json.data.children.map(child => child.data)
        receiveAt: Date.now()
    }
}

//Thunk action函数
export function fetchPosts(subreddit) {
    return function (dispatch) {
        dispatch(requestPosts(subreddit))
        return fetch(`http://www.subreddit.com/r/${subreddit}.json`)
            .then(response => response.json(), error => console.log('an error occur', error))
            .then(json => dispatch(receivePosts(subreddit), json))
    }
}