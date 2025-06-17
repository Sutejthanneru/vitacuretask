import React from 'react';

const StatusTimeline = ({ status }) => {
    const isAccepted = status === 'Accepted';
    const isRejected = status === 'Rejected';

    const getNodeClass = (nodeStatus) => {
        if (nodeStatus === 'active') return 'bg-teal-500';
        if (nodeStatus === 'rejected') return 'bg-red-500';
        return 'bg-gray-300';
    };

    const getLineClass = () => {
        if (isAccepted) return 'bg-teal-500';
        if (isRejected) return 'bg-red-500';
        return 'bg-gray-300';
    };

    const getTextClass = (nodeActive) => {
        return nodeActive ? 'font-semibold text-gray-800' : 'text-gray-500';
    };

    return (
        <div className="w-full max-w-xs pt-2">
            <div className="flex items-center">
                <div className="flex flex-col items-center">
                    <div className={`w-4 h-4 rounded-full transition-colors ${getNodeClass('active')}`}></div>
                    <p className={`text-xs mt-2 transition-colors ${getTextClass(true)}`}>Booked</p>
                </div>
                <div className={`flex-1 h-1 mx-2 transition-colors ${getLineClass()}`}></div>
                <div className="flex flex-col items-center">
                    <div
                        className={`w-4 h-4 rounded-full transition-colors ${getNodeClass(
                            isAccepted ? 'active' : isRejected ? 'rejected' : 'inactive'
                        )}`}
                    ></div>
                    <p className={`text-xs mt-2 transition-colors ${getTextClass(isAccepted || isRejected)}`}>
                        {isRejected ? 'Rejected' : 'Confirmed'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default StatusTimeline;
