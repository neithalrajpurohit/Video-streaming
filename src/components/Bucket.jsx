import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

import Header from "./Header";
import BgVideo from "../assets/video.mp4";
import {
    deleteBucket,
    fetchAllBuckets,
    updateBucketDetails,
    createBucket,
} from "../features/bucket/bucketSlice";

const Bucket = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [editCardDetails, setEditCardDetails] = useState("");
    const [cardDetails, setCardDetails] = useState({
        name: "",
        mediaLink: "",
        bucketId: "",
    });
    const dispatch = useDispatch();
    const cardData = useSelector((state) => state.card);
    const bucketData = useSelector((state) => state.bucket);

    useEffect(() => {
        dispatch(fetchAllBuckets());
    }, []);

    const handleCreate = () => {
        dispatch(createBucket({ name: cardDetails.name }))
            .unwrap()
            .then(() => {
                setShowAddModal(false);
                dispatch(fetchAllBuckets());
            });
    };

    const handleBucketUpdate = () => {
        if (editCardDetails) {
            dispatch(
                updateBucketDetails({
                    cardId: selectedCard.id,
                    name: editCardDetails,
                })
            )
                .unwrap()
                .then(() => {
                    setSelectedCard(null);
                    dispatch(fetchAllBuckets());
                });
        }
    };

    const handleDeleteBucket = (bucketId) => {
        dispatch(deleteBucket({ bucketId }))
            .unwrap()
            .then(() => {
                setSelectedCard(null);
                dispatch(fetchAllBuckets());
            });
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
                            className="btn bg-primaryLight hover:bg-primary">
                            <p>Add New Bucket</p>
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
                                exit={{ opacity: 1 }}>
                                <motion.div
                                    initial={{ y: -100, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="flex items-center justify-between px-4 mt-3">
                                    <div className="">
                                        <h1>ADD NEW Bucket</h1>
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

                                    <motion.div
                                        initial={{ y: "100px", opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{
                                            delay: 0.8,
                                            type: "spring",
                                            stiffness: 80,
                                        }}
                                        className="text-center mt-7 ">
                                        <button
                                            className="btn w-full "
                                            onClick={() => handleCreate()}>
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
                    {bucketData.buckets.map((bucket) => {
                        return (
                            <motion.div
                                layoutId={bucket.id}
                                onClick={() => setSelectedCard(bucket)}
                                key={bucket.id}
                                className="w-[200px] h-[100px] text-center text-black bg-white rounded-xl cursor-pointer">
                                <h1 className="text-lg pt-5">{bucket.name}</h1>
                            </motion.div>
                        );
                    })}
                </div>

                <AnimatePresence>
                    {selectedCard && (
                        <div
                            className="flex justify-center w-[100vw] mt-[200px] absolute top-0"
                            onClick={(e) => {
                                setShowEditModal(false);
                            }}>
                            <motion.div
                                layoutId={selectedCard.id}
                                className="w-[300px] pb-5 text-black mx-[40px] rounded-xl bg-white">
                                <div className="flex justify-between items-center mx-[20px] mt-2">
                                    <p>Edit Bucket Name</p>
                                    <AiOutlineCloseCircle
                                        className="text-2xl text-black ml-auto cursor-pointer"
                                        onClick={() => setSelectedCard(null)}
                                    />
                                </div>
                                <div className="mt-5 mx-2">
                                    <input
                                        type="text"
                                        placeholder={
                                            selectedCard && selectedCard.name
                                        }
                                        className="input input-bordered w-full mt-4 block"
                                        onChange={(e) =>
                                            setEditCardDetails(e.target.value)
                                        }
                                    />
                                </div>

                                <div className="mx-2 mt-5">
                                    <button
                                        onClick={handleBucketUpdate}
                                        className="btn w-full">
                                        Update
                                    </button>
                                </div>
                                <div className="mx-2 mt-2">
                                    <button
                                        onClick={() =>
                                            handleDeleteBucket(selectedCard.id)
                                        }
                                        className="btn w-full btn-outline btn-error">
                                        Remove
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Bucket;
