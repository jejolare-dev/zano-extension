import React from "react";
import { useContext } from "react";
import Big from "big.js";
import LoadingIcon from "../../../assets/svg/loading.svg";
import ReceiveIcon from "../../../assets/svg/receive-colored.svg";
import SendIcon from "../../../assets/svg/send-colored.svg";
import { Store } from "../../../store/store-reducer";
import TransactionDetails from "../../TransactionDetails/TransactionDetails";
import s from "./History.module.scss";
import NavLink from '../../UI/NavLink/NavLink';
import useGetAsset from "../../../hooks/useGetAsset";

interface HistoryItemProps {
  transfer: {
    assetId: string;
    amount: string;
    incoming: boolean;
  };
  fee: string;
  isInitiator: boolean;
}

const HistoryItem = ({ transfer, fee, isInitiator }: HistoryItemProps) => {
  const { getAssetById } = useGetAsset();

  if (transfer.amount === fee) return null;
  const amount = new Big(transfer.amount);
  const fixedFee = new Big(fee);

  return (
    <div className={s.historyTop}>
      <div className={s.historyIcon}>
        { transfer.incoming ? <ReceiveIcon /> : <SendIcon /> }
      </div>
      <p>
        <span>
          {transfer.assetId ===
            "d6329b5b1f7c0805b5c345f4957554002a2f557845f64d7645dae0e051a6498a"
            ? !isInitiator
              ? amount.toFixed()
              : amount.minus(fixedFee).toFixed()
            : amount.toFixed()
          }
        </span>
        {" "}
        {
          getAssetById(transfer.assetId)
            ?.ticker || '***'
        }
      </p>
    </div>
  );
};

const History = () => {
  const { state } = useContext(Store);

  return (
    <div>
      {state.wallet.transactions.map((tx) => {
        return (
          <NavLink
            key={tx.txHash}
            className={s.historyItem}
            component={TransactionDetails}
            props={tx}
          >
            {!tx.isConfirmed && (
              <div className={s.historyLoading}>
                <LoadingIcon />
              </div>
            )}

            {tx.transfers?.map((transfer) => (
              <HistoryItem transfer={transfer as any} fee={String(tx.fee)} isInitiator={Boolean(tx.isInitiator)} />
            ))}
            <span className={s.historyAddress}>{tx.txHash}</span>
          </NavLink>
        );
      })}
    </div>
  );
};

export default History;