// Library Imports
import React from 'react';
import { Grid, Box, Typography, Divider } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
// Local Imports
import { data } from './data';
import AssetsImages from "../../assets"
import { Link } from "react-router-dom";
import IconWithLink from './IconWithLink';
import { gray, secondaryColor, white } from '../../utils/style/GlobalVariables';

const Footer = () => {
    const newDate = new Date();
    const year = newDate.getFullYear();
    const section1 = data?.footer?.section1;
    const section2 = data?.footer?.section2;
    const section3 = data?.footer?.section3;
    const section4 = data?.footer?.section4;
    const section5 = data?.footer?.copyright;
    return (
        <Grid style={{ backgroundColor: secondaryColor }}>
            <Grid container maxWidth='lg' m='auto' pb='60px' sx={{ padding: { xs: '0 15px', sm: '0px 20px', lg: '0px 0px' } }}>
                <Grid item xs={12} sm={12} md={12} lg={6.5} pt='40px'>
                    <Box display='flex' flexDirection='column' gap={'20px'}>
                        <img
                            src={AssetsImages.logo}
                            alt='LuxeLocker'
                            width={160}
                            style={{ marginTop: '5px' }}
                        />
                        <Typography
                            variant='caption'
                            color={gray}
                            fontWeight={700}
                            width={{ xs: '100%', md: '50%', lg: '50%' }}
                        >
                            {section1.desc}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={6} sm={4} md={4} lg={2.5} pt='40px'>
                    <Box>
                        <Typography
                            variant='subtitle2'
                            color={gray}
                            className={"footerNavlink"}
                        >
                            {section2.title}
                        </Typography>
                        {section2?.links?.map((item, index) => (
                            <Link to={item.path} key={index} className={"linkstyle"}>
                                <Typography
                                    key={index}
                                    variant='subtitle2'
                                    color={white}
                                    pt={index === 0 ? '16px' : '10px'}
                                >
                                    {item.name}
                                </Typography>
                            </Link>
                        ))}
                    </Box>
                </Grid>
                <Grid item xs={6} sm={4} md={4} lg={2.3} pt='40px'>
                    <Box>
                        <Typography
                            variant='subtitle2'
                            color={gray}
                            className={"footerNavlink"}
                        >
                            {section3.title}
                        </Typography>
                        {section3?.links?.map((item, index) => (
                            <Link href={item.path} key={index} className={"linkstyle"}>
                                <Typography
                                    key={index}
                                    variant='subtitle2'
                                    color={white}
                                    pt={index === 0 ? '16px' : '10px'}
                                >
                                    {item.name}
                                </Typography>
                            </Link>
                        ))}
                    </Box>
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={0.7} pt='40px'>
                    <Box>
                        <Typography
                            variant='subtitle2'
                            color={gray}
                            className={"footerNavlink"}
                        >
                            {section4.title}
                        </Typography>
                        {section4?.links?.map((item, index) => (
                            <Link
                                href={item.path}
                                key={index}
                                className={"linkstyle"}
                                target='_blank'
                            >
                                <Typography
                                    key={index}
                                    variant='subtitle2'
                                    color={white}
                                    pt={index === 0 ? '16px' : '10px'}
                                >
                                    {item.name}
                                </Typography>
                            </Link>
                        ))}
                    </Box>
                </Grid>
            </Grid>
            <Grid container maxWidth='lg' m='auto' sx={{ padding: { xs: '0 15px', sm: '0px 20px', lg: '0px 0px' } }}>
                <Divider className="footerdivier" sx={{ marginTop: "60px" }} />

                <Grid item xs={12} sm={4} md={4} lg={4} py='15px'>
                    <Typography
                        variant='subtitle2'
                        color={gray}
                        textAlign={{ xs: 'center', sm: 'left', md: 'left' }}
                        component='div'
                    >
                        <span>&#169;</span> {`${year} All right reserved`}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={5} md={4} lg={4} py='15px'>
                    <Typography
                        variant='subtitle2'
                        color={gray}
                        component='div'
                        display='flex'
                        justifyContent='center'
                        gap='10px'
                    >
                        {section5.policies?.map((item, index) => (
                            <Typography
                                key={index}
                                variant='subtitle2'
                            >
                                {item}
                            </Typography>
                        ))}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={3} md={4} lg={4} py='15px'>
                    <Box
                        display='flex'
                        gap='25px'
                        alignSelf='center'
                        justifyContent={{ xs: 'center', sm: 'end', md: 'end' }}
                        component='div'
                    >
                        <IconWithLink link='https://twitter.com/luxelocker'>
                            <TwitterIcon fontSize='small' sx={{ color: gray }} />
                        </IconWithLink>
                        <IconWithLink link='https://www.facebook.com/Luxelockerstorage'>
                            <FacebookRoundedIcon sx={{ color: gray }} fontSize='small' />
                        </IconWithLink>
                        <IconWithLink link='https://www.instagram.com/luxelockerstorage/'>
                            <InstagramIcon sx={{ color: gray }} fontSize='small' />
                        </IconWithLink>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Footer