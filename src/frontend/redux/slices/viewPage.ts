import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_POSTS_PAGINATION } from 'frontend/data';
import { getPostOrderingColumnPayload, getPostPaginationPayloadColumns } from 'frontend/utils';
import { toast } from 'react-toastify';
import axios from '../../api/axios';

type ViewPageState = {
  pageData: any;
  posts: any;
};

const initialState: ViewPageState = {
  pageData: null,
  posts: { images: [], videos: [], totalImages: 0, totalVideos: 0 }
};

const slice = createSlice({
  name: 'viewPage',
  initialState,
  reducers: {
    getViewPageData(state, action) {
      return { ...state, pageData: action.payload };
    },
    updateViewPageData(state, action) {
      return {
        ...state,
        pageData: {
          ...state?.pageData,
          ...action.payload,
          user: { ...state.pageData?.user, id: action.payload.user }
        }
      };
    },
    addNewCampaign(state, action) {
      return {
        ...state,
        pageData: {
          ...state?.pageData,
          campaign_page: [...state?.pageData?.campaign_page, action.payload]
        }
      };
    },
    deleteCampaign(state) {
      return {
        ...state,
        pageData: {
          ...state?.pageData,
          campaign_page: []
        }
      };
    },
    addNewBundle(state, action) {
      return {
        ...state,
        pageData: {
          ...state?.pageData,
          subscription_tier_page: [...state?.pageData?.subscription_tier_page, action.payload]
        }
      };
    },
    updateBundle(state, action) {
      for (const [index, bundle] of (state.pageData?.subscription_tier_page || []).entries()) {
        if (bundle.id !== action.payload.bundleId) continue;
        state.pageData.subscription_tier_page[index] = action.payload.data;
        break;
      }
    },
    deleteBundle(state, action) {
      return {
        ...state,
        pageData: {
          ...state?.pageData,
          subscription_tier_page: [
            ...state?.pageData?.subscription_tier_page?.filter(
              (bundle: any) => bundle?.id !== action.payload
            )
          ]
        }
      };
    },
    addNewFreeTrial(state, action) {
      return {
        ...state,
        pageData: {
          ...state?.pageData,
          trial_page: [...state?.pageData?.trial_page, action.payload]
        }
      };
    },
    deleteFreeTrial(state, action) {
      return {
        ...state,
        pageData: {
          ...state?.pageData,
          trial_page: [
            ...state?.pageData?.trial_page?.filter(
              (freeTrial: any) => freeTrial?.id !== action.payload
            )
          ]
        }
      };
    },
    addNewPagePost(state, action) {
      console.log('action in reducer', action);
      if (action.payload.type === 'image') {
        state.posts.images = [action.payload.data, ...state?.posts?.images];
        state.posts.totalImages += 1;
      } else if (action.payload.type === 'video') {
        state.posts.videos = [action.payload.data, ...state?.posts?.videos];
        state.posts.totalVideos += 1;
      }
    },
    fetchPagePosts(state, action) {
      if (action.payload.type === 'image') {
        // state.posts.images = action.payload.data;
        state.posts.images = state.posts.images.concat(action.payload.data);
        state.posts.totalImages = action.payload?.totalRecords;
      } else if (action.payload.type === 'video') {
        state.posts.videos = state.posts.videos.concat(action.payload.data);
        state.posts.totalVideos = action.payload?.totalRecords;
      }
    },
    subscribeToPage(state, action) {
      state.pageData.is_subscribed = true;
    },
    unsubscribeToPage(state, action) {
      state.pageData.is_subscribed = false;
      state.pageData.page_subscription = [];
    },
    updatePageData(state, action) {
      state.pageData = { ...state?.pageData, ...action.payload };
    },
    resetViewPageData(state) {
      state.pageData = null;
      state.posts = { images: [], videos: [], totalImages: 0, totalVideos: 0 };
    }
  }
});

export default slice.reducer;
export const viewPageActions = slice.actions;

export const fetchViewPageData = (pageId: number) => async (dispatch: any) => {
  try {
    return axios.get(`api/page/get/${pageId}/`).then((res: any) => {
      if (res.status === 200 && res.data.code === 200) {
        dispatch(slice.actions.getViewPageData(res.data.data));
        return true;
      }
      return false;
    });
  } catch (error) {
    console.error(error);
  }
};

// to fetch the pagedata by the the page name
export const fetchViewPageDataByPageName = (pageName: string) => async (dispatch: any) => {
  try {
    return axios.get(`api/page/get-by-page_name/${pageName}/`).then((res: any) => {
      if (res.status === 200 && res.data.code === 200) {
        dispatch(slice.actions.getViewPageData(res.data.data));
        return true;
      }
      return false;
    });
  } catch (error) {
    console.log(error);
  }
};

// subscription bundle related crud operation
export const createBundle = (payload: any) => async (dispatch: any) => {
  try {
    return axios.post(`api/subscription-tier/create/`, payload).then((res: any) => {
      if (res.status === 200) {
        dispatch(slice.actions.addNewBundle(res?.data?.data));
        return true;
      }
      return false;
    });
  } catch (error) {
    console.error(error);
  }
};
export const updateBundle = (bundleId: number, payload: any) => async (dispatch: any) => {
  try {
    return axios.put(`api/subscription-tier/update/${bundleId}/`, payload).then((res: any) => {
      if (res.status === 200) {
        dispatch(slice.actions.updateBundle({ bundleId, data: res?.data?.data }));
        return true;
      }
      return false;
    });
  } catch (error) {
    console.error(error);
  }
};
export const deleteBundle = (bundleId: number) => async (dispatch: any) => {
  try {
    return axios.delete(`api/subscription-tier/delete/${bundleId}/`).then((res: any) => {
      if (res.status === 200 && res.data.code === 200) {
        dispatch(slice.actions.deleteBundle(bundleId));
        return true;
      }
      return false;
    });
  } catch (error) {
    console.error(error);
  }
};

// promotional campaign related crud operation
export const createCampaign = (payload: any) => async (dispatch: any) => {
  try {
    return axios.post(`api/subscription/promotion-campaign/create/`, payload).then((res: any) => {
      if (res.status === 200 && res?.data?.code === 201) {
        dispatch(slice.actions.addNewCampaign(res?.data?.data));
        return true;
      }
      return false;
    });
  } catch (error) {
    console.error(error);
  }
};
export const updateCampaign = (campaignId: number, payload: any) => async (dispatch: any) => {
  try {
    return axios
      .put(`api/subscription/promotion-campaign/update/${campaignId}/`, payload)
      .then((res: any) => {
        if (res.status === 200) {
          return true;
        }
        return false;
      });
  } catch (error) {
    console.error(error);
  }
};
export const deleteCampaign = (campaignId: number) => async (dispatch: any) => {
  try {
    return axios
      .delete(`api/subscription/promotion-campaign/delete/${campaignId}/`)
      .then((res: any) => {
        if (res.status === 200) {
          dispatch(slice.actions.deleteCampaign());
          return true;
        }
        return false;
      });
  } catch (error) {
    console.error(error);
  }
};

// free trial links related crud operation
export const createFreeTrial = (payload: any) => async (dispatch: any) => {
  try {
    return axios.post(`api/subscription/free-trial/create/`, payload).then((res: any) => {
      if (res.status === 200 && res?.data?.code === 201) {
        dispatch(slice.actions.addNewFreeTrial(res?.data?.data));
        return true;
      }
      return false;
    });
  } catch (error) {
    console.error(error);
  }
};
export const deleteFreeTrial = (freeTrialId: number) => async (dispatch: any) => {
  try {
    return axios.delete(`api/subscription/free-trial/delete/${freeTrialId}/`).then((res: any) => {
      if (res.status === 200 && res?.data?.code === 200) {
        dispatch(slice.actions.deleteFreeTrial(freeTrialId));
        return true;
      }
      return false;
    });
  } catch (error) {
    console.error(error);
  }
};

// for subscribe
export const subscribeToPage = (payload: any) => async (dispatch: any) => {
  try {
    return axios.post(`api/subscription/subscribe/`, payload).then((res: any) => {
      if (res.status === 200 && res?.data?.code === 201) {
        dispatch(slice.actions.subscribeToPage({}));
        return true;
      }
      return false;
    });
  } catch (error) {
    console.error(error);
  }
};

// for unsubscribe api
export const unsubscribeToPage =
  (subscription_id: number | null, payload: { reject_reason: number }) => async (dispatch: any) => {
    try {
      return axios
        .put(`api/subscription/unsubscribe/${subscription_id}/`, payload)
        .then((res: any) => {
          if (res.status === 200 && res?.data?.code === 200) {
            dispatch(slice.actions.unsubscribeToPage({}));
            return true;
          }
          return false;
        });
    } catch (error) {
      console.error(error);
    }
  };

// for creating page's posts
export const createPagePost = (toastId: any, payload: any) => async (dispatch: any) => {
  try {
    return axios.post(`api/posts/create/`, payload).then((res: any) => {
      if (res.status === 200 && res?.data?.code === 201) {
        dispatch(
          slice.actions.addNewPagePost({
            type: payload.type,
            data: res?.data?.data
          })
        );

        setTimeout(() => {
          toast.update(toastId, {
            render: 'Post Added Successful!',
            type: 'success',
            isLoading: false
          });
        }, 1000);

        setTimeout(() => {
          toast.dismiss();
        }, 3000);
        return true;
      }
      return false;
    });
  } catch (error: any) {
    toast.error(error.toString());
  }
};

// to fetch the page's post
export const getPagePosts = (userId: number, payload: any) => async (dispatch: any) => {
  try {
    return axios
      .post(`api/posts/pagination/list_by_user_id/${userId}/`, {
        ...DEFAULT_POSTS_PAGINATION,
        columns: [getPostPaginationPayloadColumns('created_at', true, true, null)],
        order: [getPostOrderingColumnPayload(0, 'desc')],
        ...payload
      })
      .then((res: any) => {
        if (res.status === 200 && res?.data?.code === 200) {
          dispatch(
            slice.actions.fetchPagePosts({
              type: payload.post_type,
              data: res?.data?.data,
              totalRecords: res?.data?.recordsTotal
            })
          );
          return true;
        }
        return false;
      });
  } catch (error) {
    console.error(error);
  }
};
