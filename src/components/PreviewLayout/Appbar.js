import React, { useState } from 'react';
import {
    AppBar,
    Box,
    Grid,
    Toolbar,
    IconButton,
    Drawer,
    Typography,
    Divider,
    Collapse,
} from '@mui/material';
import { Container } from '@mui/system';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { Link } from "react-router-dom";
import { data } from './data';
import AssetsImages from "../../assets";
import Button from '../button';
import IconText from './IconText';
import CallIcon from '../../assets/icons/CallIcon';
import EmailIcon from '../../assets/icons/EmailIcon';
import LocationIcon from '../../assets/icons/LocationIcon';
import IconWithLink from './IconWithLink';
import ScrollToColor from "./scrollToColor"
import { primaryColor, secondaryColor, white } from '../../utils/style/GlobalVariables';
import "./layout.css"

const Appbar = (props) => {
    const navItem = data.header;
    let { window } = props;
    const [openDrawer, setOpenDrawer] = useState(false);
    const container =
        window !== undefined ? () => window().document.body : undefined;
    const handleToggleDrawer = () => {
        setOpenDrawer(!openDrawer);
    };
    const [open, setOpen] = useState(false);

    const handleModal = () => {
        setOpen(!open);
    };
    const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

    // Drawer
    const drawer = (
        <Box
            bgcolor={secondaryColor}
            className="drawerMain"
            sx={{ padding: { xs: '0 15px', sm: '0px 20px', lg: '0px 0px' } }}
        >
            <Box className={"drawerContainer"}>
                <Box className={"mobileNav"}>
                    <Box className={"mobileLogo"} mt={2}>
                        {/* <Link to="/" style={{ textDecoration: 'none' }}> */}
                        <img src={AssetsImages.logo} alt='Logo' width={135} />
                        {/* </Link> */}
                        <IconButton
                            aria-label='open drawer'
                            onClick={handleToggleDrawer}
                            sx={{ padding: '0px' }}
                        >
                            <CloseRoundedIcon sx={{ color: white }} />
                        </IconButton>
                    </Box>
                    <Box
                        display='flex'
                        flexDirection='column'
                        alignItems='start'
                        gap='25px'
                        mt='20px'
                    >
                        {navItem.map((item, index) => {
                            const isOpen = openDropdownIndex === index;
                            return (
                                <span
                                    // to={item.path}
                                    key={index}
                                    style={{ textDecoration: 'none', width: '100%', color: 'white' }}
                                    onClick={() => {
                                        if (item?.path !== '#') {
                                            setOpenDropdownIndex(isOpen ? null : index);
                                            handleToggleDrawer();
                                        }
                                    }}
                                >
                                    <Box
                                        display='flex'
                                        justifyContent='space-between'
                                        width='100%'
                                        alignItems='center'
                                    >
                                        <Typography
                                            color={"info"}
                                            variant='subtitle1'
                                        >
                                            {item.name}
                                        </Typography>
                                        {item?.child?.length > 0 && (
                                            <KeyboardArrowDownRoundedIcon
                                                sx={{
                                                    color: 'text.primary',
                                                    transform: isOpen ? 'rotate(-180deg)' : 'unset',
                                                    transition: 'all 0.3s ease',
                                                }}
                                                onClick={() =>
                                                    setOpenDropdownIndex(isOpen ? null : index)
                                                }
                                            />
                                        )}
                                    </Box>
                                    <Collapse
                                        in={isOpen && item?.child && item?.child?.length > 0}
                                    >
                                        <Box
                                            display='flex'
                                            flexDirection='column'
                                            alignItems='start'
                                            gap='25px'
                                            mt='20px'
                                        >
                                            {' '}
                                            {item?.child?.map(
                                                (childItem, index) => {
                                                    return (
                                                        <span
                                                            // to={childItem?.path}
                                                            key={index}
                                                            className="linkstyle"
                                                        >
                                                            <Typography
                                                                color={'primary'}
                                                                variant='subtitle1'
                                                            >
                                                                {childItem?.name}
                                                            </Typography>
                                                        </span>
                                                    );
                                                }
                                            )}
                                        </Box>
                                    </Collapse>
                                </span>
                            );
                        })}
                    </Box>
                    <Box className={"navButtons"}>
                        <Button
                            variant='contained'
                            color={'success'}
                            className={"!capitalize"}
                            fullWidth
                            onClick={handleModal}
                            sx={{ borderRadius: '8px', paddingInline: '18px', paddingBlock: '9px' }}
                        >
                                Rent or Buy
                            </Button>
                        </Box>
                    </Box>
                    <Divider className="footerdivier" />
                    <Box display='flex' flexDirection='column' gap='20px'>
                        <IconText icon={<CallIcon />} text='833-333-5893' color="white" />
                        <IconText icon={<EmailIcon />} text='info@luxelocker.com' color="white" />
                        <IconText
                            icon={<LocationIcon />}
                            text='349 Lake Havasu Ave S. Suite 106. Lake Havasu City, AZ 86403'
                            color="white"
                        />
                    </Box>
                </Box>
                <Box display='flex' gap='60px' alignSelf='center' mb={2}>
                    <IconWithLink link='https://twitter.com/luxelocker'>
                        <TwitterIcon color='success' fontSize='medium' />
                    </IconWithLink>
                    <IconWithLink link='https://www.facebook.com/Luxelockerstorage'>
                        <FacebookRoundedIcon color='success' fontSize='medium' />
                    </IconWithLink>
                    <IconWithLink link='https://www.instagram.com/luxelockerstorage/'>
                        <InstagramIcon color='success' fontSize='medium' />
                    </IconWithLink>
                </Box>
            </Box>
    );
    return (
        <Grid>
            {/* // Top Bar */}
            <Grid
                style={{ backgroundColor: secondaryColor }}
                display={{ xs: 'none', sm: 'none', md: 'flex' }}
                className={"topbar"}
            >
                <Box maxWidth='lg' className={"topbarbox"}>
                    <Box display='flex' gap='30px'>
                        <IconText icon={<CallIcon />} text='229-518-9570' color="white" />
                        <IconText icon={<EmailIcon />} text='info@luxelocker.com' color="white" />
                        <IconText
                            icon={<LocationIcon />}
                            text='349 Lake Havasu Ave S. Suite 106. Lake Havasu City, AZ 86403'
                            color="white"
                        />
                    </Box>
                    <Box display='flex' gap='20px' alignItems="center">
                        <IconWithLink link='https://twitter.com/luxelocker'>
                            <TwitterIcon color='success' fontSize='small' />
                        </IconWithLink>
                        <IconWithLink link='https://www.facebook.com/Luxelockerstorage'>
                            <FacebookRoundedIcon color='success' fontSize='small' />
                        </IconWithLink>
                        <IconWithLink link='https://www.instagram.com/luxelockerstorage/'>
                            <InstagramIcon color='success' fontSize='small' />
                        </IconWithLink>
                    </Box>
                </Box>
            </Grid>

            {/* App Bar */}
            <ScrollToColor>
                <AppBar
                    elevation={0}
                    sx={{
                        marginTop: { xs: '0px', sm: '0px', md: '45px' }, "&.MuiPaper-root": {
                            backgroundColor: `${primaryColor} !important`,
                            py: '10px',
                        }
                    }}
                >
                    <Container maxWidth='lg' sx={{ padding: { xs: '0px', sm: '0px' } }} >
                        <Toolbar className="toolbar" sx={{ padding: { xs: '0 15px', sm: '0px 20px', lg: '0px 0px' } }}>
                            <Box mt={2}>
                                <Link href='/' style={{ textDecoration: 'none' }}>
                                    <img src={AssetsImages.logo} alt='Logo' width={160} />
                                </Link>
                            </Box>
                            <Box
                                sx={{
                                    display: { xs: 'flex', sm: 'block', md: 'none' },
                                    textAlign: 'center',
                                }}
                            >
                                <IconButton
                                    aria-label='open drawer'
                                    onClick={handleToggleDrawer}
                                    sx={{ padding: '0px' }}
                                >
                                    <MenuRoundedIcon sx={{ color: white }} />
                                </IconButton>
                            </Box>
                            <Box
                                className={"navLinks"}
                                sx={{
                                    display: {
                                        xs: 'none',
                                        sm: 'none',
                                        md: 'flex',
                                        gap: '20px',
                                    },
                                }}
                            >
                                {navItem.map((item, index) => {
                                    return (
                                        <span
                                            // to={item.path}
                                            key={index}
                                            className={"linkstyle"}
                                        >
                                            <Typography
                                                color='white'
                                                display='flex'
                                                flexDirection='column'
                                                alignItems='center'
                                                sx={{ fontSize: '15px' }}
                                            >
                                                {item.name}
                                            </Typography>
                                        </span>
                                    );
                                })}
                            </Box>
                            <Box
                                className={"actions"}
                                sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}
                            >
                                <Button
                                    variant='contained'
                                    color={'success'}
                                    className={"!capitalize"}
                                    onClick={handleModal}
                                    sx={{ borderRadius: '8px', paddingInline: '18px', paddingBlock: '9px' }}
                                >
                                    Rent or Buy
                                </Button>
                            </Box>
                        </Toolbar>

                        {/* Drawer */}
                        <Box component='nav'>
                            <Drawer
                                container={container}
                                variant='temporary'
                                anchor='top'
                                open={openDrawer}
                                onClose={handleToggleDrawer}
                                ModalProps={{
                                    keepMounted: false, // Better open performance on mobile.
                                }}
                                transitionDuration={700}
                                sx={{
                                    display: { xs: 'block', sm: 'block', md: 'none' },
                                }}
                            >
                                {drawer}
                            </Drawer>
                        </Box>
                    </Container>
                </AppBar>
            </ScrollToColor>
        </Grid>
    )
}

export default Appbar