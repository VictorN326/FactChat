import React, { useState } from 'react';
import { Channel, ChannelList, useChat, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import { ChannelSearch, TeamChannelList, TeamChannelPreview } from '.';
import HarmonyIcon from '../assets/harmony.png';
import LogoutIcon from '../assets/logout.png';

const cookies = new Cookies();

const SideBar = ({ logout }) => (
    <div className="channel-list__sidebar">
        <div className="channel-list__sidebar__icon1">
            <div className="icon1__inner">
                <img src={HarmonyIcon} alt="Hospital" width="30" />
            </div>
        </div>
        <div className="channel-list__sidebar__icon2">
            <div className="icon1__inner" onClick={logout}>
                <img src={LogoutIcon} alt="Logout" width="30" />
            </div>
        </div>
    </div>
);
const CompanyHeader = () => (
    <div className='channel-list__header'>
        <p className='channel-list__header__text'>Harmony</p>
    </div>
)

const ChannelTeamFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'team');
}

const ChannelMessagingFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'messaging');
}
const ChannelListContent = ({isCreating, setIsCreating, setIsEditing, setCreateType, setToggleContainer}) => {
    const {client} = useChatContext();
    const logout = () => {
       cookies.remove("token");
       cookies.remove("userID");
       cookies.remove("username");
       cookies.remove("fullName");
       cookies.remove("AvatarURL");
       cookies.remove("hashedPassword");
       cookies.remove("phoneNumber");

       window.location.reload();
    }
    //get all the channels and messages that our current user is involved in
    const filters = {
        $and: [
          {members: {$in: [client.userID]}},
          {type: {$in: ['messaging', 'team', 'gaming', 'customType2']}}
        ]
      };
    return (
        <>
            <SideBar logout={logout}/>
            <div className='channel-list__list__wrapper'>
                <CompanyHeader />
                <ChannelSearch />
                <ChannelList filters={filters} channelRenderFilterFn={ChannelTeamFilter} List={(listProps) => (
                    <TeamChannelList {...listProps} type="team"
                      isCreating = {isCreating}
                      setIsCreating = {setIsCreating}
                      setIsEditing = {setIsEditing}
                      setCreateType = {setCreateType}
                      setToggleContainer={setToggleContainer}
                    />)}
                    Preview={(previewProps) => (
                        <TeamChannelPreview {...previewProps} type="team" 
                            setToggleContainer={setToggleContainer}
                            setIsCreating={setIsCreating}
                            setIsEditing={setIsEditing}
                        />
                    )}
                />

                <ChannelList filters={filters} channelRenderFilterFn={ChannelMessagingFilter} List={(listProps) => (
                    <TeamChannelList {...listProps} type="messaging"
                    isCreating = {isCreating}
                    setIsCreating = {setIsCreating}
                    setIsEditing = {setIsEditing}
                    setCreateType = {setCreateType}
                    setToggleContainer={setToggleContainer}
                    />)}
                    Preview={(previewProps) => (
                        <TeamChannelPreview {...previewProps} type="messaging"
                         setIsCreating={setIsCreating}
                         setIsEditing={setIsEditing}
                         setToggleContainer={setToggleContainer} />
                    )}
                />
            </div>
        </>
    )
}

const ChannelListContainer = ({ setCreateType, setIsCreating, setIsEditing }) => {
    const [toggleContainer, setToggleContainer] = useState(false);

    return (
        <>
            <div className="channel-list__container">
              <ChannelListContent 
                setIsCreating={setIsCreating} 
                setCreateType={setCreateType} 
                setIsEditing={setIsEditing} 
              />
            </div>

            <div className="channel-list__container-responsive"
                style={{ left: toggleContainer ? "0%" : "-89%", backgroundColor: "#005fff"}}
            >
                <div className="channel-list__container-toggle" onClick={() => setToggleContainer((prevToggleContainer) => !prevToggleContainer)}>
                </div>
                  <ChannelListContent 
                    setIsCreating={setIsCreating} 
                    setCreateType={setCreateType} 
                    setIsEditing={setIsEditing}
                    setToggleContainer={setToggleContainer}
              />
            </div>
        </>
    )

}
export default ChannelListContainer;