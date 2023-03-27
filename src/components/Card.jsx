import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchBucketDetails } from "../features/bucket/bucketSlice";

const Card = (props) => {
    const { id, name, mediaLink, bucketId, buckets, onSelectedCard } = props;
    const dispatch = useDispatch();

    const bucketData = useSelector((state) => state.bucket);

    useEffect(() => {
        dispatch(fetchBucketDetails({ cardId: bucketId }));
    }, []);

    return (
        <motion.div
            layoutId={id}
            onClick={() => onSelectedCard({ id, name, mediaLink, bucketId })}
            className="w-[200px] h-[180px] text-center bg-white shadow-lg text-black p-2 cursor-pointer rounded-xl "
        >
            <h1 className="mt-4">{name}</h1>
            <h2 className="mt-2 text-sm text-gray-500">
                {bucketData?.bucketDetails?.name}
            </h2>
        </motion.div>
    );
};

export default Card;
