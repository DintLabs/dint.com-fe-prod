import React from 'react';
import { Story } from 'react-insta-stories/dist/interfaces';

const contentStyleStoryBack = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  '@media screen and (max-width: 899px)': {
    width: '100% !important',
    height: '100% !important',
  },
};
const image = {
  display: "block",
  borderRadius: 4,
  height: "100%",
  width: "100%",
};

type CreateUserStoriesPayload = {
  user_stories: any[];
};

export const createUserStories = ({
  user_stories,
}: CreateUserStoriesPayload): Story[] => {
  return user_stories.map((story: any) => {
    const extension = story.story.substr(story.story.length - 3);
    switch (extension.toLowerCase()) {
      case "mp4":
        return {
          url: story.story,
          type: "video",
        };

      default:
        return {
          content: () => (
            <div style={contentStyleStoryBack}>
              <img style={image} src={story.story} alt="Story" />
            </div>
          ),
        };
    }
  });
};
