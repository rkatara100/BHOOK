import React from 'react'
import './AppDownload/AppDownload.css';
import { assets } from '../../assets/assets';

const AppDownload = () => {
      return (
            <div className='app-download'>
                  <p>For Better User Experience Download Now<br />BHOOK App</p>
                  <div className='app-download-platforms'>
                        <img src={assets.play_store} alt="play-store-img" />
                        <img src={assets.app_store} alt="app-store-img" />
                  </div>
            </div>
      )
}

export default AppDownload
