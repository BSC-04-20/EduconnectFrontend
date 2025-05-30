// import { useState, useEffect } from 'react';
// import { AuthenticatedUserUrl } from "../../../../config/urlFetcher";
import PropTypes from 'prop-types';


export default function DiscussionFeed({ discussions, handleDiscussionClick }){
    return (
<div>
                                    {(!discussions || discussions.length === 0) ? (
                                        <div className="text-gray-500">No discussions yet.</div>
                                    ) : (
                                        <ul className="space-y-3">
                                            {discussions.map(discussion => {
                                                const date = new Date(discussion.start_time);
                                                const formattedDate = date.toLocaleDateString();
                                                const formattedTime = date.toLocaleTimeString();
                                                const now = new Date();
                                                const start = new Date(discussion.start_time);
                                                const fiveMinutesBefore = new Date(start.getTime() - 5 * 60 * 1000);
                                                const oneDayAfter = new Date(start.getTime() + 24 * 60 * 60 * 1000);
                                                const canJoin = now >= fiveMinutesBefore && now <= oneDayAfter;
                                                let tooltipText = "";
                                                if (now < fiveMinutesBefore) {
                                                    tooltipText = "You may join 5 minutes before the meeting starts.";
                                                } else if (now > oneDayAfter) {
                                                    tooltipText = "You can no longer join this meeting (more than a day late).";
                                                } else if (canJoin && now <= start) {
                                                    tooltipText = "You can join this meeting now.";
                                                } else if (now >= start && now <= oneDayAfter) {
                                                    tooltipText = "The meeting is live.";
                                                } else {
                                                    tooltipText = "You cannot join this meeting.";
                                                }
                                                return (
                                                    <li key={discussion.id}>
                                                        <div className="relative group">
                                                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                                                                {tooltipText}
                                                            </div>
                                                            <button
                                                                onClick={() => handleDiscussionClick(discussion)}
                                                                className="w-full text-left block p-4 border rounded-lg hover:bg-sky-50 transition"
                                                            >
                                                                <div className="font-semibold text-gray-800">{discussion.meeting_name}</div>
                                                                <div className="text-sm text-gray-500">
                                                                    {formattedDate} &middot; {formattedTime}
                                                                </div>
                                                            </button>
                                                        </div>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    )}
                                                                </div>)}
                                
                                // PropTypes validation
                                DiscussionFeed.propTypes = {
                                    discussions: PropTypes.arrayOf(
                                        PropTypes.shape({
                                            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
                                            start_time: PropTypes.string.isRequired,
                                            meeting_name: PropTypes.string.isRequired,
                                        })
                                    ),
                                    handleDiscussionClick: PropTypes.func.isRequired,
                                };