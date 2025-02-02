const initialState = {
  myProfile: {},
  experience: [],
  posts: [],
  newExperienceId: {},
  expForPut: {},
  postedPostId: "",
  showExperienceDel: {
    show: false,
    id: "",
  },
  comments: [],
  authorComment: "",
  favorites: [],
  hasExpPicPut: false,
  hasExpPicPost: false,
  hasPropicLoaded: false,
  hasExpLoaded: false,
  hasPostsLoaded: false,
  hasCommentsLoaded: false,
  showCard: true,
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_MYPROFILE":
      return {
        ...state,
        myProfile: action.payload,
      };
    case "GET_EXPERIENCE":
      return {
        ...state,
        experience: action.payload,
      };
    case "GET_ALLPOSTS":
      return {
        ...state,
        posts: action.payload,
      };
    case "NEWEXPERIENCE_ID":
      return {
        ...state,
        newExperienceId: action.payload,
      };
    case "GET_EXPFORPUT":
      return {
        ...state,
        expForPut: action.payload,
      };
    case "GET_POSTEDPOST_ID":
      return {
        ...state,
        postedPostId: action.payload,
      };
    case "SHOW_EXPERIENCE_DEL":
      return {
        ...state,
        showExperienceDel: action.payload,
      };
    case "GET_COMMENTS":
      return {
        ...state,
        comments: action.payload,
      };
    case "GET_AUTHOR_COMMENT":
      return {
        ...state,
        authorComment: action.payload,
      };
    case "ADD_TO_FAVORITES":
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case "REMOVE_FROM_FAVORITES":
      return {
        ...state,
        favorites: state.favorites.filter((job) => job._id !== action.payload),
      };
    case "HAS_EXP_PIC_PUT":
      return {
        ...state,
        hasExpPicPut: action.payload,
      };
    case "HAS_EXP_PIC_POST":
      return {
        ...state,
        hasExpPicPost: action.payload,
      };
    case "HAS_PROPIC_LOADED":
      return {
        ...state,
        hasPropicLoaded: action.payload
      };
    case "HAS_EXP_LOADED":
      return {
        ...state,
        hasExpLoaded: action.payload
      }
    case "HAS_POSTS_LOADED":
      return {
        ...state,
        hasPostsLoaded: action.payload
      }
    case "HAS_COMMENTS_LOADED":
      return {
        ...state,
        hasCommentsLoaded: action.payload
      }
    case "SHOW_CARD":
      return {
        ...state,
        showCard: action.payload
      }
    default:
      return state;
  }
};

export default mainReducer;
