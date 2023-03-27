import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Header from "./Header";
import BgVideo from "../assets/video.mp4";
import { fetchAllHistories } from "../features/card/cardSlice";

const History = () => {
    const dispatch = useDispatch();
    const cardData = useSelector((state) => state.card);

    useEffect(() => {
        dispatch(fetchAllHistories());
    }, []);

    return (
        <div>
            <Header />
            <div className="w-screen h-screen fixed top-0 left-0 right-0 bottom-0">
                <video
                    src={BgVideo}
                    autoPlay
                    muted
                    playsInline
                    loop
                    className="w-full h-full object-cover object-center"
                />
                <div className="bg-[rgba(0,0,0,.8)] absolute top-0 right-0 bottom-0 left-0" />
            </div>
            <div className="absolute top-[80px] w-[100vw] bottom-0 left-0 right-0 text-white">
                <div className="bg-white w-[400px] text-black pb-5 mx-auto">
                    <p className="text-2xl text-black text-center">History</p>
                    {cardData.histories.map((history) => {
                        return (
                            <div
                                key={history.id}
                                className="mx-4 mb-4 border-b pb-2"
                            >
                                <p>{history.name}</p>
                                <a
                                    className="text-blue-400"
                                    href={`https://www.youtube.com/embed/${history.mediaLink}`}
                                >
                                    Medai Link
                                </a>
                                <p>
                                    Played At:{" "}
                                    {moment(history.playedAt).format(
                                        "ddd, hh:mmA"
                                    )}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default History;
