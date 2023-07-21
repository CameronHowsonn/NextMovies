import React, { useContext, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import styled from 'styled-components';
import TrailerContext from '../context/TrailerModal';

interface VideoModalProps {
  url: string;
  site?: string;
}

const VideoModal: React.FC<VideoModalProps> = ({ url, site }) => {
  const { isModalOpen, setIsModalOpen } = useContext(TrailerContext);
  const [key, setKey] = useState<number>(0);
  const [videoSize, setVideoSize] = useState({ width: 0, height: 0 });
  const playerRef = useRef(null);

  useEffect(() => {
    const setSizes = () => {
      setKey((prevKey) => prevKey + 1);
      const aspectRatio = window.innerWidth / window.innerHeight;
      const width = (1080 * aspectRatio) / 2;
      const height = 1080 / aspectRatio;
      setVideoSize({ width: width, height: height });
    };

    const closeOnClickedOutside = (e) => {
      if (playerRef?.current && !playerRef?.current?.contains(e.target)) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener('resize', () => setSizes());
    document.addEventListener('click', closeOnClickedOutside);

    setSizes();
    return () => {
      document.removeEventListener('resize', () => setSizes());
      document.removeEventListener('click', closeOnClickedOutside);
    };
  }, []);

  return (
    <Modal key={key}>
      <CloseButton onClick={() => setIsModalOpen(false)} />
      <ModalContent ref={playerRef}>
        {videoSize.width && videoSize.height && (
          <Player
            url={url}
            width={videoSize.width}
            height={videoSize.height}
            controls
          />
        )}
      </ModalContent>
    </Modal>
  );
};

export default VideoModal;

const Player = styled(ReactPlayer)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  z-index: 1001;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 2rem;
  color: #fff;
  padding: 1rem;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2rem;
    height: 2px;
    background-color: #fff;

    transform: translate(-50%, -50%) rotate(45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;
