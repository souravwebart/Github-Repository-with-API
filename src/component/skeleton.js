import React from "react";
import "./skeleton.css";

export default function Skeleton({ type }) {
  const COUNTER = 10;
  const FeedSkeleton = () => (
    <div className="respo-details-skl">
    <div className="respo-skl">
    </div>
    <div className="user-respo=skl">
    </div>
</div>
  );

  const TopSkeleton = () => (
    <div className="profile-skl">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="avatar-skl"></div>
                                </div>
                                <div className="col-md-8">
                                    <div className="profile-details">
                                    <div className="profile-text-skl"></div>
                                    <div className="profile-description-skl"></div>
                                        <div className="location-details-skl">
                                        </div>
                                        <div className="twitter-skl"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
  );



  if (type === "feed") return Array(COUNTER).fill(<FeedSkeleton />);
  if (type === "top") return <TopSkeleton />;
}