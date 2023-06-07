import React, {CSSProperties, useCallback, useEffect, useMemo, useState} from 'react';
import Web3 from 'web3'
import Currency from "../../../ui/info/plot/Currency";
import {getCookie} from "../../../../helpers/cookieApi";
import {requestURL} from "../../../../helpers/requestApi";
import HoverDescription from "../../../ui/info/HoverDescription/HoverDescription";
import Label from "../../../ui/base/Label";
import {useAppDispatch} from "../../../../hooks/redux";
import {userDataSlice} from "../../../../reducers/slices/UserDataSlice";
import {color} from "three/examples/jsm/nodes/shadernode/ShaderNodeBaseElements";
import {messagesStateSlice} from "../../../../reducers/slices/app/MessagesStateSlice";

interface IOffer {
    ruble: number
    eth: number
    points: number
    status: string
    color: CSSProperties['color']
}

const WalletModal = () => {
    const dispatch = useAppDispatch()

    const handleOnClick = useCallback(async (offer: IOffer) => {
        try {
            //@ts-ignore
            await window.ethereum.enable();
            //@ts-ignore
            const web3 = new Web3(window.ethereum);
            //@ts-ignore
            const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});


            const recipientAddress = '0xAEA046Bb94C0C0b79C97Ce59D252e6A35CE5b97F';

            const transactionParameters = {
                from: accounts[0],
                to: recipientAddress,
                //@ts-ignore
                value: web3.utils.toWei(offer.eth.toFixed(18).toString(), 'ether'),
            };

            const transactionHash = await web3.eth.sendTransaction(transactionParameters);

            await fetch(requestURL('user/me/transaction/'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${getCookie('token')}`
                },
                body: JSON.stringify({
                    amount: offer.points,
                    transactionHash: transactionHash.transactionHash,
                }),
            })
                .then(response => response.json())
                .then((data) => {
                    dispatch(userDataSlice.actions.updateAuthUser({wallet: Number(data.wallet)}))
                    dispatch(messagesStateSlice.actions.setLogs([{
                        text: (
                            <>
                                Вы получили <Currency amount={offer.points}/>
                            </>
                        ),
                        date: new Date().toLocaleDateString(),
                        isNotice: true,
                        // lifetime: 50000
                    }]))

                })
                .catch(error => console.log(error))

        } catch (error) {
            console.error(error);
        }
    }, []);

    const [ethPrice, setEthPrice] = useState(null);
    useEffect(() => {
        const fetchEthPrice = async () => {
            try {
                const response = await fetch(
                    'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=rub',
                    {headers: {'Content-Type': 'application/json'}}
                );
                const data = await response.json();
                const rubPrice = data?.ethereum?.rub;
                setEthPrice(rubPrice);
            } catch (error) {
                console.error('Error fetching ETH price:', error);
            }
        };
        fetchEthPrice();
    }, []);

    const offers = useMemo<IOffer[]>(() => {
        const arr = [
            {ruble: 50, points: 1000000, status: 'Starter', color: 'rgba(255, 140, 0, 0.8)'},
            {ruble: 150, points: 3500000, status: 'Silver', color: 'rgba(192, 192, 192, 0.8)'},
            {ruble: 300, points: 8000000, status: 'Gold', color: 'rgba(255, 215, 0, 0.8)'},
            {ruble: 500, points: 16000000, status: 'Platinum', color: 'rgba(229, 228, 226, 0.8)'},
        ].map(offer => {
            return {...offer, color: `linear-gradient(45deg, ${offer.color}, rgba(255, 255, 255, 1))`}
        })
        return ethPrice ? arr.map(item => ({...item, eth: item.ruble / ethPrice})) : []
    }, [ethPrice]);

    return (
        <div className={'modal-content-wallet'}>
            {offers.map((offer, i) => (
                <li key={i} style={{background: offer.color}}>
                    <h3>{offer.status}</h3>
                    <div className={'info'}>
                        <Currency amount={offer.ruble} currency={'ruble'}/>
                        <HoverDescription description={String(offer.eth)}>
                            <Currency amount={offer.eth} currency={'eth'}/>
                        </HoverDescription>
                        <label>
                            Вы получите: <Currency amount={offer.points} currency={'point'}/>
                        </label>
                    </div>
                    <button onClick={() => handleOnClick(offer)}>Выбрать</button>
                </li>
            ))}
        </div>
    );
};

export default WalletModal;