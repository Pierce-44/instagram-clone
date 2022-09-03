/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useAtom } from 'jotai';
import CloseBtnSVG from '../svgComps/CloseBtnSVG';
import DragPhotosVideos from '../svgComps/DragPhotosVideos';
import ReturnArrow from '../svgComps/ReturnArrow';
import atoms from '../../util/atoms';
import { handleSelectedImage, handleSubmit } from '../../util/handleAddNewPost';

function AddNewPost({
  setAddPost,
}: {
  setAddPost: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [userDetails] = useAtom(atoms.userDetails);
  const [userNotifications] = useAtom(atoms.userNotifications);

  const [imageSelected, setImageSelected] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState<any>();
  const [caption, setCaption] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  return (
    <div
      className="fixed top-0 z-10 flex h-full w-full cursor-default  items-center justify-center bg-[#0000008f] dark:bg-[#000000d7]"
      onClick={(e: any) => {
        if (e.target.id === 'closeAddPost') setAddPost(false);
      }}
      role="button"
      tabIndex={0}
      id="closeAddPost"
    >
      {loading ? (
        <div className="animate-spin rounded-full bg-[#000000de] p-2">
          <picture>
            <img
              className="h-10 w-10"
              src="/instagramLoading.png"
              alt="instagram loading"
            />
          </picture>
        </div>
      ) : (
        <div>
          <button
            className="fixed top-5 right-5"
            type="button"
            onClick={() => setAddPost(false)}
          >
            <CloseBtnSVG
              lightColor="#f1f5f9"
              darkColor="#f1f5f9"
              heightWidth="20"
            />
          </button>
          <div className="w-[444px] flex-col overflow-hidden rounded-xl bg-white dark:border dark:border-stone-300 dark:bg-[#000000]">
            {imageSelected ? (
              <div>
                <div className="flex items-center justify-between px-4">
                  <button
                    onClick={() => {
                      setSelectedImage(undefined);
                      setImageSelected(false);
                    }}
                    type="button"
                  >
                    <ReturnArrow />
                  </button>
                  <h1 className="border-b border-stone-300 py-3 text-center font-semibold dark:border-stone-700">
                    Post Preview
                  </h1>
                  <button
                    onClick={() =>
                      handleSubmit({
                        userNotifications,
                        userDetails,
                        caption,
                        selectedImage,
                        setLoading,
                        setAddPost,
                      })
                    }
                    className="font-semibold text-[#0095f6]"
                    type="button"
                  >
                    Create
                  </button>
                </div>
                <div>
                  <picture>
                    <img
                      className="h-[444px] w-[444px] object-cover"
                      src={URL.createObjectURL(selectedImage!)}
                      alt="post"
                    />
                  </picture>
                </div>
                <div className="p-4">
                  <input
                    className="w-full focus:outline-none"
                    placeholder="Write a caption..."
                    type="text"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                  />
                </div>
              </div>
            ) : (
              <div>
                <h1 className="border-b border-stone-300 py-5 text-center font-semibold dark:border-stone-700">
                  Create new post
                </h1>
                <div className="flex h-[444px] flex-col items-center justify-center">
                  <div className="mx-auto">
                    <DragPhotosVideos />
                  </div>
                  <h1 className="py-5 text-xl">Upload photos and videos</h1>
                  <div className="flex justify-center rounded-[4px] bg-[#0095f6] text-sm font-semibold text-white dark:border-stone-700 dark:text-[#0f0f0f]">
                    <label
                      className="flex-grow cursor-pointer px-3 py-1  text-center"
                      htmlFor="photoFile"
                    >
                      Select From Computer
                      <input
                        type="file"
                        id="photoFile"
                        accept=".png, .jpg, .jpeg"
                        hidden
                        onChange={(e) =>
                          handleSelectedImage({
                            e,
                            setSelectedImage,
                            setImageSelected,
                          })
                        }
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AddNewPost;
