import React, {useEffect, useState} from 'react';
import {IComments} from "../../../../../../types/user/userTypes";

const PlotGallery = () => {
    type PhotoType = {
        albumId: number,
        id: number,
        title: string,
        url: string,
        thumbnailUrl: string
    }

    const [photos, setPhotos] = useState<PhotoType[]>([]);
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/photos/?_limit=10')
            .then(response => response.json())
            .then(data => setPhotos(data))
    }, []);

    const [comments, setComments] = useState<IComments[]>([
        {id: 1, date: '20.20.2021', text: 'adsadda'},
        {id: 1, date: '20.20.2021', text: 'adsadda'},
        {id: 1, date: '20.20.2021', text: 'adsadda'},
        {id: 1, date: '20.20.2021', text: 'adsadda'},
        {id: 1, date: '20.20.2021', text: 'adsadda'},
        {id: 1, date: '20.20.2021', text: 'adsadda'},
    ]);

    return (
        <div className='plot-content-gallery'>
            <div className='list'>
                {photos.map((photo, i) =>
                    <div key={i} className='item'>
                        <img src={photo.url}/>
                        <div className='actions'>
                            <img src="/assets/images/users/thumb_up.svg"/>
                            <img src="/assets/images/users/comments.svg"/>
                        </div>
                    </div>
                )}sss
            </div>
            <div className='comments'>
                <div className='input'>
                    <textarea placeholder='Написать комментарий'/>
                    <button>Отправить</button>
                </div>
                <div className='list'>
                    {comments.map((comment, i) =>
                        <div key={i} className='item'>
                            <span className='text'>{comment.text}</span>
                            <span className='date'>{comment.date}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PlotGallery;