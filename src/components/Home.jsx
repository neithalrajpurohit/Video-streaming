import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineCloseCircle, AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import {
    addToHistory,
    createCard,
    deleteCard,
    fetchAllCards,
    fetchCardDetails,
    updateCardDetails,
} from "../features/card/cardSlice";

import Header from "./Header";
import Card from "./Card";
import BgVideo from "../assets/video.mp4";
import { fetchAllBuckets } from "../features/bucket/bucketSlice";

const Home = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [editCardDetails, setEditCardDetails] = useState({
        name: "",
        bucket: null,
    });
    const [cardDetails, setCardDetails] = useState({
        name: "",
        mediaLink: "",
        bucketId: "",
    });
    const dispatch = useDispatch();
    const cardData = useSelector((state) => state.card);
    const bucketData = useSelector((state) => state.bucket);

    useEffect(() => {
        dispatch(fetchAllCards());
        dispatch(fetchAllBuckets());
    }, []);

    //for setting the previous values of card
    useEffect(() => {
        if (cardData.cardDetails) {
            setEditCardDetails({
                name: cardData.cardDetails.name,
                id: cardData.cardDetails.id,
                bucket: cardData.cardDetails.bucket,
            });
        }
    }, [cardData.cardDetails]);

    const onSelectedCard = (card) => {
        setSelectedCard(card);
        dispatch(
            fetchCardDetails({ cardId: card.id, bucketId: card.bucketId })
        );
        dispatch(
            addToHistory({
                name: card.name,
                mediaLink: card.mediaLink,
                bucketId: card.bucketId,
                playedAt: new Date(),
            })
        );
    };

    //updating card details
    const updateCard = () => {
        dispatch(
            updateCardDetails({
                name: editCardDetails.name,
                bucketId: Number(editCardDetails.bucket.id),
                cardId: Number(editCardDetails.id),
            })
        )
            .unwrap()
            .then((res) => {
                // fetch updated cards
                console.log(res);
                setSelectedCard({
                    cardId: res.id,
                    bucketId: res.bucketId,
                    name: res.name,
                    mediaLink: res.mediaLink,
                });
                dispatch(
                    fetchCardDetails({
                        cardId: res.id,
                        bucketId: res.bucketId,
                    })
                )
                    .unwrap()
                    .then(() => {
                        setShowEditModal(false);
                    });
            });
    };

    const handleDeleteCard = (card) => {
        dispatch(deleteCard({ cardId: card.id }))
            .unwrap()
            .then(() => {
                setShowEditModal(false);
                setEditCardDetails(false);
                setSelectedCard(null);
                dispatch(fetchAllCards());
            });
    };
    const handleCreateCard = () => {
        if (cardDetails.name && cardDetails.bucketId && cardDetails.mediaLink) {
            dispatch(createCard(cardDetails))
                .unwrap()
                .then(() => {
                    setShowAddModal(false);
                    dispatch(fetchAllCards());
                });
        } else {
            alert("Enter all required field");
        }
    };

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
                <div className="text-center">
                    {!showAddModal && (
                        <motion.button
                            layoutId="my"
                            onClick={() => setShowAddModal(true)}
                            className="btn bg-primaryLight hover:bg-primary"
                        >
                            <p>Add New Card</p>
                        </motion.button>
                    )}
                </div>

                {/* {add modal} */}
                <AnimatePresence mode="sync">
                    {showAddModal && (
                        <motion.div className="flex justify-center absolute w-[100vw]">
                            <div className="fixed w-[100vw] bg-[rgba(0,0,0,.8)] top-0 bottom-0 left-0 right-0" />
                            <motion.div
                                className="bg-primaryLight w-[400px] h-[400px] relative rounded-lg overflow-hidden z-50"
                                layoutId="my"
                                exit={{ opacity: 1 }}
                            >
                                <motion.div
                                    initial={{ y: -100, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="flex items-center justify-between px-4 mt-3"
                                >
                                    <div className="">
                                        <h1>ADD NEW CARD</h1>
                                    </div>

                                    <AiOutlineCloseCircle
                                        className="text-2xl text-white cursor-pointer"
                                        onClick={() => setShowAddModal(false)}
                                    />
                                </motion.div>
                                <div className="mt-[40px] mx-4">
                                    <motion.input
                                        type="text"
                                        placeholder="Card Name"
                                        className="input input-bordered w-full bg-[rgba(255,255,255,.4)] text-white placeholder:text-white"
                                        initial={{ y: "100px", opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{
                                            delay: 0.6,
                                            type: "spring",
                                            stiffness: 80,
                                        }}
                                        onChange={(e) =>
                                            setCardDetails({
                                                ...cardDetails,
                                                name: e.target.value,
                                            })
                                        }
                                    />
                                    <div className="my-4" />
                                    <motion.input
                                        type="url"
                                        placeholder="media link"
                                        className="input input-bordered w-full bg-[rgba(255,255,255,.4)] text-white placeholder:text-white"
                                        initial={{ y: "100px", opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{
                                            delay: 0.7,
                                            type: "spring",
                                            stiffness: 80,
                                        }}
                                        onChange={(e) =>
                                            setCardDetails({
                                                ...cardDetails,
                                                mediaLink: e.target.value,
                                            })
                                        }
                                    />
                                    <div className="my-4" />

                                    <motion.select
                                        placeholder="media link"
                                        className="input input-bordered w-full bg-[rgba(255,255,255,.4)] text-white placeholder:text-white"
                                        initial={{ y: "100px", opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{
                                            delay: 0.8,
                                            type: "spring",
                                            stiffness: 80,
                                        }}
                                        onChange={(e) =>
                                            setCardDetails({
                                                ...cardDetails,
                                                bucketId: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="default" disabled>
                                            Select Bucket
                                        </option>
                                        {bucketData.buckets.map((bucket) => {
                                            return (
                                                <option
                                                    key={bucket.id}
                                                    value={bucket.id}
                                                >
                                                    {bucket.name}
                                                </option>
                                            );
                                        })}
                                    </motion.select>

                                    <motion.div
                                        initial={{ y: "100px", opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{
                                            delay: 0.8,
                                            type: "spring",
                                            stiffness: 80,
                                        }}
                                        className="text-center mt-7 "
                                    >
                                        <button
                                            className="btn w-full "
                                            onClick={handleCreateCard}
                                        >
                                            Create
                                        </button>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* {all cards} */}
                <div className="flex flex-wrap items-center gap-6 mx-[100px] mt-9">
                    {cardData.cards.map((card) => {
                        return (
                            <Card
                                key={card.id}
                                {...card}
                                onSelectedCard={onSelectedCard}
                            />
                        );
                    })}
                </div>

                <AnimatePresence>
                    {selectedCard && (
                        <div
                            className="flex justify-center absolute w-[100vw] top-0"
                            onClick={(e) => {
                                setShowEditModal(false);
                            }}
                        >
                            <motion.div
                                layoutId={selectedCard.id}
                                className="w-[100vw] h-[87vh] text-black mx-[40px] rounded-xl bg-white"
                            >
                                <div className="flex justify-between items-center mx-[20px] mt-4">
                                    <motion.h5 className="text-2xl">
                                        {selectedCard.name}
                                    </motion.h5>
                                    <AiOutlineCloseCircle
                                        className="text-2xl text-black ml-auto cursor-pointer"
                                        onClick={() => setSelectedCard(null)}
                                    />
                                </div>

                                <div className="flex justify-center overflow-hidden rounded-xl mt-4">
                                    <iframe
                                        src={`https://www.youtube.com/embed/${selectedCard.mediaLink}`}
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                        className="w-[95vw] h-[70vh]"
                                    ></iframe>
                                </div>

                                {cardData.cardDetails && (
                                    <div className="mt-5 ml-4 flex items-center justify-between">
                                        <div>
                                            <h2>
                                                <span className="text-3xl mr-2">
                                                    Bucket Name:
                                                </span>
                                                <span>
                                                    {
                                                        cardData.cardDetails
                                                            .bucket.name
                                                    }
                                                </span>
                                            </h2>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="mr-8 flex relative flex-col justify-center items-center cursor-pointer">
                                                <CiEdit
                                                    className="text-4xl"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setShowEditModal(
                                                            !showEditModal
                                                        );
                                                    }}
                                                />
                                                <p>Edit</p>

                                                {/* {show edit modal} */}
                                                <AnimatePresence>
                                                    {showEditModal && (
                                                        <motion.div
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                            }}
                                                            className="shadow-xl p-2 bg-primary w-[400px] h-[400px] absolute bottom-[70px] right-0 rounded-xl"
                                                            initial={{
                                                                opacity: 0,
                                                                scale: 0,
                                                            }}
                                                            animate={{
                                                                opacity: 1,
                                                                scale: 1,
                                                            }}
                                                            exit={{
                                                                opacity: 0,
                                                                scale: 0,
                                                            }}
                                                        >
                                                            <div className="flex justify-between px-4 pt-2">
                                                                <p className="text-white font-semibold">
                                                                    Edit
                                                                </p>
                                                                <AiOutlineCloseCircle
                                                                    className="text-2xl text-white cursor-pointer"
                                                                    onClick={() =>
                                                                        setShowEditModal(
                                                                            false
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                            <div>
                                                                <div className="mt-6 mx-5">
                                                                    <label
                                                                        htmlFor="cardName"
                                                                        className="text-sm text-white ml-2 mb-1"
                                                                    >
                                                                        New Card
                                                                        Name
                                                                    </label>
                                                                    <motion.input
                                                                        type="text"
                                                                        placeholder={
                                                                            selectedCard.name
                                                                        }
                                                                        value={
                                                                            editCardDetails.name
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            setEditCardDetails(
                                                                                {
                                                                                    ...editCardDetails,
                                                                                    name: e
                                                                                        .target
                                                                                        .value,
                                                                                }
                                                                            )
                                                                        }
                                                                        className="input input-bordered w-full bg-[rgba(255,255,255,.4)] text-white placeholder:text-white"
                                                                    />

                                                                    <div className="my-4" />
                                                                    <label
                                                                        htmlFor="cardName"
                                                                        className="text-sm text-white ml-2 mb-1"
                                                                    >
                                                                        Move To
                                                                        Bucket
                                                                    </label>
                                                                    <select
                                                                        onChange={(
                                                                            e
                                                                        ) => {
                                                                            setEditCardDetails(
                                                                                {
                                                                                    ...editCardDetails,
                                                                                    bucket: {
                                                                                        ...editCardDetails.bucket,
                                                                                        id: e
                                                                                            .target
                                                                                            .value,
                                                                                    },
                                                                                }
                                                                            );
                                                                        }}
                                                                        value={
                                                                            editCardDetails
                                                                                .bucket
                                                                                ?.id
                                                                        }
                                                                        placeholder="media link"
                                                                        className="input input-bordered w-full bg-[rgba(255,255,255,.4)] text-white placeholder:text-white"
                                                                    >
                                                                        <option
                                                                            value="default"
                                                                            disabled
                                                                        >
                                                                            Select
                                                                            Bucket
                                                                        </option>
                                                                        {bucketData.buckets.map(
                                                                            (
                                                                                bucket
                                                                            ) => {
                                                                                return (
                                                                                    <option
                                                                                        key={
                                                                                            bucket.id
                                                                                        }
                                                                                        value={
                                                                                            bucket.id
                                                                                        }
                                                                                    >
                                                                                        {
                                                                                            bucket.name
                                                                                        }
                                                                                    </option>
                                                                                );
                                                                            }
                                                                        )}
                                                                    </select>

                                                                    <div className="mt-8">
                                                                        <button
                                                                            className="btn w-full"
                                                                            onClick={
                                                                                updateCard
                                                                            }
                                                                        >
                                                                            Save
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                            <div
                                                className="mr-8 flex flex-col justify-center items-center cursor-pointer"
                                                onClick={() =>
                                                    handleDeleteCard(
                                                        cardData.cardDetails
                                                    )
                                                }
                                            >
                                                <AiOutlineDelete className="text-4xl text-red-500" />
                                                <p className="text-red-500">
                                                    Remove
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Home;
