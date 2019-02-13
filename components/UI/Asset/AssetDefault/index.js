import PropTypes from 'prop-types';
import Link from 'next/link';
import {
  Progress,
  Icon,
} from 'antd';
import StyledAssetDefaultDetailsContainer from './styledAssetDefaultDetailsContainer';
import StyledAssetDefaultFunded from './styledAssetDefaultFunded';
import StyledAssetDefaultGoal from './styledAssetDefaultGoal';
import StyledAssetDefaultContributeButton from './styledAssetDefaultContributeButton';
import { formatMonetaryValue } from 'utils/helpers';

const AssetDefault = ({
  amountRaisedInUSD,
  amountToBeRaisedInUSD,
  pastDate,
  funded,
  assetId,
  clickHandler,
}) => {
  const barWidth = funded ? 100 : Math.ceil((amountRaisedInUSD / amountToBeRaisedInUSD) * 100);
  const goalFormatted = formatMonetaryValue(amountToBeRaisedInUSD);
  let buttonText = 'Contribute';
  let buttonType = 'primary';
  if (funded || pastDate) {
    buttonText = 'View Asset';
    buttonType = 'default';
  }

  return (
    <StyledAssetDefaultDetailsContainer
      barWidth={barWidth}
    >
      <StyledAssetDefaultFunded>
        Funded:{' '}
        <b>{funded ? goalFormatted : `${formatMonetaryValue(amountRaisedInUSD)}`}</b>
      </StyledAssetDefaultFunded>
      <StyledAssetDefaultGoal>
        Goal:{' '}
        <b>{goalFormatted}</b>
      </StyledAssetDefaultGoal>
      <div>
        <Progress percent={barWidth} />
        {barWidth === 100 && (
          <Icon
            type="check-circle"
            theme="filled"
          />
        )}
      </div>

      <Link
        as={`/asset/${assetId}`}
        href={`/asset?id=${assetId}`}
      >
        <StyledAssetDefaultContributeButton
          type={buttonType}
          onClick={
            clickHandler ||
            (() => debug(`Clicked to contribute, asset id: ${assetId}`))
          }
        >
          {buttonText}
        </StyledAssetDefaultContributeButton>
      </Link>
    </StyledAssetDefaultDetailsContainer>
  )
};

AssetDefault.propTypes = {
  funded: PropTypes.number.isRequired,
  goal: PropTypes.number.isRequired,
  city: PropTypes.string,
  country: PropTypes.string,
  name: PropTypes.string,
  category: PropTypes.string.isRequired,
  clickHandler: PropTypes.func,
  AssetDefaultId: PropTypes.string.isRequired,
  backgroundImage: PropTypes.string,
  fundingStage: PropTypes.string.isRequired,
  pastDate: PropTypes.bool.isRequired,
  watchListed: PropTypes.bool.isRequired,
  handleAssetFavorited: PropTypes.func.isRequired,
};

AssetDefault.defaultProps = {
  city: '',
  country: '',
  name: '',
  clickHandler: () => {},
  backgroundImage: '',
};

export default AssetDefault;
