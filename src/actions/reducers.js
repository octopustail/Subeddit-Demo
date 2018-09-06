import {combineReducer} from 'redux'
import {
    SELECT_SUBREDDIT,
    INVALIDATE_SUBREDDIT,
    REQUEST_POSTS,
    RECEIVE_POSTS
} from './action'

function selectedSubreddit(state = 'reactjs', action) {

    switch (action.type) {
        case SELECT_SUBREDDIT:
            return action.subreddit
        default:
            return statez
    }

}

function posts(state = {isFetching: false, didValidate: false, item: []}, action) {
    switch (action.type) {
        case INVALIDATE_SUBREDDIT:
            return {
                ...state, didValidate: true
            }
        case REQUEST_POSTS:
            return {
                ...state, isFetching: true, didValidate: false
            }
        case RECEIVE_POSTS:
            return {
                ...state, isFetching: false, didValidate: false, item: action.posts, lastUpdate: action.receiveAt
            }
        default:
            return state
    }
}

function postBySubredit(state = {}, action) {
    switch (action.type) {
        case INVALIDATE_SUBREDDIT:
        case RECEIVE_POSTS:
        case REQUEST_POSTS:
            return {
                ...state,
                [action.subreddit]: posts(state[action.subreddit], action)
            }
        default:return state
    }
}

function shouldFetchPosts(state, subreddit) {
    const posts = state.postsBySubreddit[subreddit]
    if (!posts) {
        return true
    } else if (posts.isFetching) {
        return false
    } else {
        return posts.didInvalidate
    }
}

export function fetchPostsIfNeeded(subreddit) {

    // 注意这个函数也接收了 getState() 方法
    // 它让你选择接下来 dispatch 什么。

    // 当缓存的值是可用时，
    // 减少网络请求很有用。

    return (dispatch, getState) => {
        if (shouldFetchPosts(getState(), subreddit)) {
            // 在 thunk 里 dispatch 另一个 thunk！
            return dispatch(fetchPosts(subreddit))
        } else {
            // 告诉调用代码不需要再等待。
            return Promise.resolve()
        }
    }
}

const rootReducer = combineReducer({
    postBySubredit,
    selectedSubreddit
});

export default rootReducer