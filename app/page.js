"use client";
import { useEffect, useState} from "react";

export default function Home() {
  
  // pages object
  const [pagesObject, setPagesObject] = useState({
    totalPages: null,
    currentSpread: [0],
    endsWithSpread:false,
    spreads:null,
  });

  const [hasLoaded, sethasLoaded] = useState(false)
  const baseURL = "https://viewer.ipaper.io/demo-flipbooks/right-to-left-navigation/home-kitchen/";

  useEffect(() => {
    // Function to initialize iPaperJsApi for your myFlipbook iframe
    const initializeFlipbook = () => {
      const Flipbook = document.getElementById("Flipbook");
      if (Flipbook) {
        const FlipbookInstance = iPaperJsApi(Flipbook, 3);


        // Set pages object
        FlipbookInstance.paging.getState((result) => {
          setPagesObject({
            totalPages: result.totalPages,
            currentSpread: [result.totalPages],
            spreads: result.spreads,
            endsWithSpread: result.spreads[result.spreads.length - 1].length === 1
          });
        });


        FlipbookInstance.paging.onChange((result) => {
          setPagesObject((prevPagesObject) => ({
            ...prevPagesObject,
            currentSpread: result.currentSpread,
          }));
        });
      }
      showFlipbook()
    };

    initializeFlipbook();
  }, []);

  let RToLFormatedPageNumber = "";

  if (pagesObject.currentSpread.length === 1 && pagesObject.currentSpread[0] === 0) {
      RToLFormatedPageNumber = "";
  } else {
      RToLFormatedPageNumber = pagesObject.currentSpread
          .map(page => pagesObject.totalPages - page + 1)
          .join("/");
  }

const showFlipbook = ()=>{
  setTimeout(()=>{sethasLoaded(true)},750)
}

  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center">
        <div className="w-full h-16 bg-gray-200 flex items-center justify-center">
          <div className="w-28 h-16 flex justify-center items-center">
            <p className="text-2xl">{pagesObject.totalPages} - {RToLFormatedPageNumber}</p>
          </div>
        </div>
        <div className="flex h-full relative">
          <iframe
            id="Flipbook"
            className={`w-full h-full ${hasLoaded?"opacity-100":"opacity-0"}`}
            //adds querystring to hide standard UI + Navigation buttons
            src={`${baseURL}?page=${pagesObject.totalPages}`}
          />
        </div>
      </div>
      {/* call api */}
      <script src="https://cdn.ipaper.io/flipbooks/api/v3/latest.js"></script>
    </>
  );
}
