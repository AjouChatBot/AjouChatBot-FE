import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useChat } from '../contexts/ChatContext';
import { useUser } from '../contexts/UserContext';
import { ChatMessageAPIResponse } from '../types/chat';
import ChatHistory from '../components/chat/ChatHistory';
import Icon from '../components/Icons/Icon';
import { fetchConversation } from '../services/fetchConversationService.ts';
import { fetchRecentTopics } from '../services/recentTopicService';
import { v4 as uuidv4 } from 'uuid';

const MobileChat = () => {
  const [message, setMessage] = useState('');
  const [currentTopic, setCurrentTopic] = useState<string>('');
  const { conversation_id } = useParams();
  const { accessToken } = useUser();
  const { chatLogs, setChatLogs, isBotTyping, handleSend } = useChat();
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const inputAreaRef = useRef<HTMLDivElement | null>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [inputAreaHeight, setInputAreaHeight] = useState(0);

  useEffect(() => {
    const measureHeights = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.clientHeight);
      }
      if (inputAreaRef.current) {
        setInputAreaHeight(inputAreaRef.current.clientHeight);
      }
    };

    measureHeights();
    window.addEventListener('resize', measureHeights);

    const imgElements = document.querySelectorAll('#mobile-chat-wrap img');
    imgElements.forEach((img) => img.addEventListener('load', measureHeights));

    return () => {
      window.removeEventListener('resize', measureHeights);
      imgElements.forEach((img) =>
        img.removeEventListener('load', measureHeights)
      );
    };
  }, []);

  useEffect(() => {
    const loadChat = async () => {
      if (!conversation_id || !accessToken) return;

      try {
        const res = await fetchConversation(conversation_id, accessToken);
        const messages = res.data.messages as ChatMessageAPIResponse[];

        const fetchedLogs = messages.map((msg) => ({
          id: uuidv4(),
          sender: msg.sender,
          message: msg.message,
          isUser: msg.sender === 'user',
          status: 'inputted' as const,
        }));
        setChatLogs(fetchedLogs);
      } catch (err) {
        console.log('대화 불러오기 실패:', err);
      }
    };
    loadChat();
  }, [conversation_id, accessToken, setChatLogs]);

  useEffect(() => {
    const loadRecentTopic = async () => {
      if (!accessToken) return;
      try {
        const topics = await fetchRecentTopics(accessToken);
        if (topics.length > 0) {
          setCurrentTopic(topics[0].question);
        }
      } catch (error) {
        console.error('Failed to load recent topic:', error);
      }
    };
    loadRecentTopic();
  }, [accessToken]);

  useEffect(() => {
    if (chatLogs.length > 0) {
      const lastMessage = chatLogs[chatLogs.length - 1];
      // Only scroll to bottom for user messages or when bot is typing to avoid jarring scrolls
      if (lastMessage.sender === 'user' || isBotTyping) {
        requestAnimationFrame(() => {
          if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop =
              chatContainerRef.current.scrollHeight;
          }
        });
      }
    }
  }, [chatLogs, isBotTyping]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    if (message.trim()) {
      const trimmedMessage = message.trim();
      setMessage('');
      await handleSend({
        sender: 'user',
        message: trimmedMessage,
      });
      if (inputRef.current) {
        inputRef.current.blur();
      }
    }
  };

  // Handlers for manual scroll adjustment
  const handleInputFocusScroll = () => {
    const chatContainer = chatContainerRef.current;
    const inputField = inputRef.current;
    if (chatContainer && inputField) {
      // Scroll the chat container to bring the input field area into view above the keyboard
      // The exact scroll amount might need fine-tuning based on keyboard height
      const inputArea = inputAreaRef.current; // Use the ref for the whole input area
      if (inputArea) {
        const containerRect = chatContainer.getBoundingClientRect();
        const inputAreaRect = inputArea.getBoundingClientRect();
        // Scroll the chat container so that the top of the input area is visible above the chat content's bottom
        // We need to consider the space the keyboard will take up
        // This is a simplified approach; true keyboard height detection is complex on web
        const scrollAmount = inputAreaRect.bottom - containerRect.bottom + 10; // Scroll up a bit more than needed
        chatContainer.scrollTop = chatContainer.scrollTop + scrollAmount;
      }
    }
  };

  const handleInputBlurScroll = () => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      // Scroll to the very bottom when the keyboard is dismissed
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  };

  return (
    <div className='text-black w-screen h-screen flex flex-col'>
      <div
        className='absolute inset-0'
        style={{
          backgroundImage: 'url("/mobilebackground.svg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -1,
        }}
      />

      <div ref={headerRef} className='w-full z-10'>
        <div className='mt-[70px] w-full flex flex-col items-center gap-0 py-4'>
          <Icon name='amatetext_mobile' size={70} />
          <span className='font-sm text-black opacity-30'>
            지금 주제: {currentTopic}
          </span>
        </div>
      </div>

      <div
        id='chat-content'
        className='flex-grow overflow-y-auto scrollbar-hide px-6 py-2'
        ref={chatContainerRef}
        style={{
          paddingTop: `${headerHeight}px`,
          paddingBottom: `${inputAreaHeight}px`,
        }}
      >
        <div className='flex flex-col gap-4'>
          <ChatHistory chatLogs={chatLogs} isTyping={isBotTyping} />
          <div ref={bottomRef} className='h-[1px]' />
        </div>
      </div>

      <div
        ref={inputAreaRef}
        className='w-full px-6 flex flex-col items-center pb-[43px] bg-white z-10'
      >
        <div className='w-full px-4 py-2 bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-gray-200 inline-flex justify-between items-center'>
          <input
            ref={inputRef}
            type='text'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={handleInputFocusScroll}
            onBlur={handleInputBlurScroll}
            placeholder='메시지 입력'
            className={`flex-1 text-sm font-medium leading-loose outline-none ${
              message ? 'text-mono_a' : 'text-mono_c'
            }`}
          />
          <button
            onClick={handleSendMessage}
            className={`w-7 h-7 relative flex justify-center items-center ${
              message.trim() ? 'opacity-100' : 'opacity-30'
            }`}
            style={{ padding: 0 }}
          >
            <div className='w-7 h-7 bg-blue_a rounded-full flex items-center justify-center'>
              <Icon name='sendicon_white' size={16} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileChat;
