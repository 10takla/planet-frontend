import React, {useCallback, useEffect, useState} from 'react';
import Web3 from 'web3'

const Wallet = () => {
    const [amount, setAmount] = useState(0);
    useEffect(() => {
        //@ts-ignore
        if (typeof window.ethereum !== 'undefined') {
            console.log('MetaMask is installed!');
        }
    }, []);
    const handleOnClick = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (amount) {
            try {
                //@ts-ignore
                await window.ethereum.enable();
                //@ts-ignore
                const web3 = new Web3(window.ethereum);

                const accounts = await web3.eth.getAccounts();
                const defaultAccount = accounts[0];

                const recipientAddress = '0x36365E17a1C166F29ae32D0450AA0fA5d2387af5'; // Replace with the actual recipient address
                const weiAmount = web3.utils.toWei(amount.toString(), 'ether');
                const transactionParameters = {
                    from: defaultAccount,
                    to: recipientAddress,
                    value: weiAmount
                };

                const transactionHash = await web3.eth.sendTransaction(transactionParameters);
                console.log('Transaction sent:', transactionHash);

            } catch (error) {
                console.error(error);
            }
        }
    }, [amount]);

    return (
        <div>
            <input onChange={e => setAmount(parseInt(e.target.value))} type={"number"}/>
            <button onClick={handleOnClick}>Пополнить счет</button>
        </div>
    );
};

export default Wallet;