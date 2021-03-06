const fs=require('fs');
const log4js = require('log4js');
log4js.configure({appenders: {stdout: {type: 'stdout'}}, categories: {default: {appenders: ['stdout'], level: 'ALL'}}});
const logger = log4js.getLogger('config.js');

const DOMAIN = process.env.DOMAIN || 'example.com';
const myorg = process.env.ORG || 'org1';
const peer0Port = process.env.PEER0_PORT || '7051';
const ordererName = process.env.ORDERER_NAME  || 'orderer';
const HARDCODED_ORDERER_NAME = process.env.HARDCODED_ORDERER_NAME || 'orderer';
const ordererDomain = process.env.ORDERER_DOMAIN || process.env.DOMAIN || 'example.com';
const ordererPort = process.env.ORDERER_GENERAL_LISTENPORT || '7050';


const CRYPTO_CONFIG_DIR = "crypto-config";
let cryptoConfigPath = fs.realpathSync(process.env.CRYPTO_CONFIG_DIR || '../fabric-starter/crypto-config');

logger.info(`Crypto-config path: ${cryptoConfigPath}`);

const TEMPLATES_DIR = process.env.TEMPLATES_DIR || '/etc/hyperledger/templates';

const enrollId = process.env.ENROLL_ID || 'admin';
const enrollSecret = process.env.ENROLL_SECRET || 'adminpw';

// default to peer0.org1.example.com:7051 inside docker-compose or export ORGS='{"org1":"peer0.org1.example.com:7051","org2":"peer0.org2.example.com:7051"}'
let orgs = process.env.ORGS || `"${myorg}":"peer0.${myorg}.${DOMAIN}:${peer0Port}"`;
let cas = process.env.CAS || `"${myorg}":"ca.${myorg}.${DOMAIN}:7054"`;

const ORDERER_CRYPTO_DIR = `${cryptoConfigPath}/ordererOrganizations/${ordererDomain}`;
const PEER_CRYPTO_DIR = `${cryptoConfigPath}/peerOrganizations/${myorg}.${DOMAIN}`;

const ordererAddr = `${ordererName}.${ordererDomain}:${ordererPort}`;
const ordererApiPort = process.env.ORDERER_API_PORT || '4500';
const ordererApiAddr = `api.${ordererDomain}:${ordererApiPort}`;

const certificationDomain= /*isOrderer ? */ `${myorg}.${DOMAIN}`;

const systemChannelId = "orderer-system-channel";

module.exports = {
    log4js: log4js,
    domain: DOMAIN,
    org: myorg,

    enrollId: enrollId,
    enrollSecret: enrollSecret,
    orgs: orgs,
    cas: cas,

    peer0Port: peer0Port,
    ordererName: ordererName,
    ORDERER_DOMAIN: ordererDomain,
    CRYPTO_CONFIG_DIR: cryptoConfigPath,
    TEMPLATES_DIR: TEMPLATES_DIR,
    ORDERER_CRYPTO_DIR: ORDERER_CRYPTO_DIR,
    ORDERER_TLS_CERT: `${ORDERER_CRYPTO_DIR}/msp/tlscacerts/tlsca.${ordererDomain}-cert.pem`,
    ORDERER_ADDR: ordererAddr,
    ORDERER_API_ADDR: ordererApiAddr,

    PEER_CRYPTO_DIR: PEER_CRYPTO_DIR,
    certificationDomain: certificationDomain,
    orgCryptoConfigPath: (org) => `${cryptoConfigPath}/peerOrganizations/${org}.${DOMAIN}`,

    systemChannelId: systemChannelId,

    isOrderer: ordererName == myorg,



    USE_SERVICE_DISCOVERY: process.env.USE_SERVICE_DISCOVERY || true,
    WEBADMIN_DIR: process.env.WEBADMIN_DIR || "./admin",

    WEBAPPS_DIR: process.env.WEBAPPS_DIR || "webapps",
    MIDDLWARE_DIR: process.env.MIDDLWARE_DIR || "./routes",

    UI_LISTEN_BLOCK_OPTS: process.env.UI_LISTEN_BLOCK_OPTS === "true" || process.env.UI_LISTEN_BLOCK_OPTS,

    DNS_CHANNEL: process.env.DNS_CHANNEL || "common",
    DNS_UPDATE_TIMEOUT: process.env.DNS_UPDATE_TIMEOUT ||4000,
    CHANNEL_LISTENER_UPDATE_TIMEOUT: process.env.CHANNEL_LISTENER_UPDATE_TIMEOUT ||10000,
    CHAINCODE_PROCESSING_TIMEOUT: process.env.CHAINCODE_PROCESSING_TIMEOUT || 60000,

    INVOKE_RETRY_COUNT: process.env.INVOKE_RETRY_COUNT || 3,
    JOIN_RETRY_COUNT: process.env.JOIN_RETRY_COUNT || 10,
    LISTENER_RETRY_COUNT: process.env.LISTENER_RETRY_COUNT || 20,

    HARDCODED_ORDERER_NAME: HARDCODED_ORDERER_NAME
};
