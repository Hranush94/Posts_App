import {FETCH_POSTS,FETCH_POST,DELETE_POST} from '../actions';
import _ from 'lodash';

export default function (state = {}, action) {
  switch (action.type) {
    case DELETE_POST:
    return _.omit(state,action.payload);//if state has key of the post.id,
    // just drop off it,delete it from hishoghutyiunic
    case FETCH_POST:
      // const post=action.payload.data;
      // const newState={...state};
      // newState[post.id]=post;
      // return newState;
      return {...state,[action.payload.data.id]:action.payload.data};//ays toghy u
    // verevi grac 4 toghery irar hamarjeq en
    case FETCH_POSTS:
      return _.mapKeys(action.payload.data, 'id');



//mapKeys arrayy indeqsavoruma yst
// erkrord tvac parametri,ays depqum yst id -i,aysinqn [4:{title:'ffff',id:'4'},]
    default:
      return state;
  }
}