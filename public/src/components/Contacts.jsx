import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined)
  const [currentUserImage, setCurrentUserImage] = useState(undefined)
  const [currentSelected, setCurrentSelected] = useState(undefined)
  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    )
    setCurrentUserName(data.username)
    setCurrentUserImage(data.avatarImage)
  }, [])
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index)
    changeChat(contact)
  }
  return (
    <>
      {currentUserImage && currentUserImage && (
        <Container>
          <div className='brand'>
            <h3>Group-app</h3>
          </div>
          <div className='current-user'>
            <div className='avatar'>
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt='avatar'
              />
            </div>
            <div className='username'>
              <h2>{currentUserName}</h2>
            </div>
          </div>
          <div className='contacts'>
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? 'selected' : ''
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className='avatar'>
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt=''
                    />
                  </div>
                  <div className='username'>
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              )
            })}
          </div>
        </Container>
      )}
    </>
  )
}
const Container = styled.div`
  border-right: 1px solid #a2a2a2;
  -webkit-border-top-left-radius: 15px;
  -webkit-border-bottom-left-radius: 15px;
  -moz-border-radius-topleft: 15px;
  -moz-border-radius-bottomleft: 15px;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  display: grid;
  grid-template-rows: 10% 20% 70%;
  overflow: hidden;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: black;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      color: black;
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
    }
    .selected {
      color: white;
      background-color: #9a86f3;
    }
  }

  .current-user {
    margin-bottom: 1rem;
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
  @media (max-width: 550px) {
    grid-template-rows: 20% 37% 33%;
    height: 15rem;
    border: none;
    border-bottom: 1px solid;
    border-bottom-left-radius: 0px;
  }
`
