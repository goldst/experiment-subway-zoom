import { useEffect, useRef, useState } from 'react';
import './App.css'

let originalSize = [245, 166];

const svg = ([
    { col: '#52822f', path: 'M 170.18842,126.61925 V 120.08122 C 170.18842,119.06804 169.35939,118.23901 168.34657,118.23901 H 161.52102 C 160.50785,118.23901 159.67882,117.41034 159.67882,116.39716 V 111.03071 C 159.67882,110.01753 158.84979,109.18885 157.83696,109.18885 H 142.49254 C 141.47937,109.18885 140.06437,108.60254 139.34788,107.88604 L 128.47774,97.016256 C 127.76125,96.299765 127.17528,94.884773 127.17528,93.871595 V 70.669401 C 127.17528,69.656223 126.34661,68.827196 125.33308,68.827196 H 102.05751 C 100.70143,68.827196 99.601469,67.72794 99.601469,66.37151 V 46.636416' },
    { col: '#52822f', path: 'M 204.16262,102.49183 196.30979,94.63935 C 195.59365,93.922858 194.17866,93.336894 193.16548,93.336894 H 189.30609 C 188.29291,93.336894 186.87792,93.922858 186.16143,94.63935 L 173.52881,107.27232 C 172.81232,107.98846 171.39733,108.57478 170.38415,108.57478 H 142.74683 C 141.73365,108.57478 140.31866,107.98846 139.60217,107.27232 L 129.09186,96.762013 C 128.37537,96.045522 127.78941,94.63053 127.78941,93.617352 V 70.669511 C 127.78941,69.313081 126.6898,68.213472 125.33337,68.213472 H 102.0578 C 101.04462,68.213472 100.21594,67.384445 100.21594,66.371267 V 46.636526' },
    { col: '#c20831', path: 'M 220.89003,69.440313 199.5244,90.805946 C 198.80791,91.522438 197.39291,92.108401 196.37974,92.108401 H 188.79748 C 187.78431,92.108401 186.36931,92.694718 185.65318,93.410857 L 173.0202,106.04383 C 172.30371,106.76032 170.88872,107.34664 169.87554,107.34664 H 143.25528 C 142.24211,107.34664 140.82712,106.76032 140.11062,106.04383 L 130.31998,96.253187 C 129.60384,95.537049 129.01753,94.122057 129.01753,93.108879 V 34.893139 C 129.01753,33.880314 128.1885,33.051286 127.17567,33.051286 H 88.886586' },
    { col: '#ec6725', path: 'M 63.324627,129.9052 H 121.90902 C 123.09118,129.9052 124.05814,128.93788 124.05814,127.75643 V 118.01518 C 124.05814,116.83337 124.74183,115.18237 125.57756,114.34664 L 143.46268,96.461867 C 144.29841,95.626137 144.9821,93.975137 144.9821,92.792979 V 53.497416 C 144.9821,52.31561 144.01513,51.348646 142.83298,51.348646 H 131.78045 C 130.59864,51.348646 129.63168,50.381682 129.63168,49.199524 V 48.17153 C 129.63168,46.989371 128.66436,46.022407 127.48256,46.022407 H 78.084143 C 76.902338,46.022407 75.537793,46.419635 75.052018,46.905057 L 74.169368,47.78806' },
    { col: '#0065ae', path: 'M 63.324627,117.01114 H 121.93971 C 122.95254,117.01114 124.36788,116.42518 125.08402,115.70868 L 144.29348,96.499229 C 145.00997,95.782738 145.59628,94.367746 145.59628,93.354568 V 56.790916 C 145.59628,55.777739 146.18225,54.362747 146.89874,53.646608 L 159.91201,40.633342 C 160.62814,39.91685 161.21446,38.501858 161.21446,37.488681 V 19.790525' },
    { col: '#bc7a00', path: 'M 211.26961,107.86202 196.20459,92.796998 C 195.48845,92.080859 194.0731,91.494543 193.06028,91.494543 H 188.58353 C 187.5707,91.494543 186.15571,90.908579 185.43922,90.192087 L 183.15463,87.907145 C 182.43849,87.191007 181.85218,85.776015 181.85218,84.762837 V 77.50514 C 181.85218,76.491962 181.26621,75.076971 180.54937,74.360832 L 179.70941,73.520515 C 178.99327,72.804024 177.57792,72.21806 176.5651,72.21806 H 141.64504 C 140.63221,72.21806 139.80318,73.047087 139.80318,74.059912 V 88.419732 C 139.80318,89.775809 138.70358,90.875418 137.34714,90.875418 H 124.39561 C 123.38244,90.875418 121.96745,91.461734 121.25095,92.178226 L 113.07039,100.35844 C 112.35425,101.07493 110.93926,101.66089 109.92608,101.66089 H 81.401882' },
    { col: '#00a984', path: 'M 92.843127,101.04692 H 109.67168 C 110.68486,101.04692 112.09985,100.46096 112.81635,99.744464 L 120.99691,91.563901 C 121.71305,90.847409 123.12839,90.261445 124.14122,90.261445 H 137.3471 C 138.35993,90.261445 139.18895,89.432417 139.18895,88.41924 V 74.060126 C 139.18895,72.703696 140.28856,71.604087 141.64499,71.604087 H 176.62996 C 177.64314,71.604087 179.05813,71.017771 179.77463,70.301632 L 180.54968,69.526226 C 181.26617,68.810087 181.85213,67.395096 181.85213,66.381918 V 54.780821' },
    { col: '#38397e', path: 'M 0.16276713,23.720954 62.13806,85.696247 C 62.854552,86.412739 64.269543,86.998703 65.282368,86.998703 H 72.391899' },
    { col: '#38397e', path: 'M 125.33203,86.385013 H 99.835722 C 98.822544,86.385013 97.993517,87.214041 97.993517,88.226866 V 89.274263 C 97.993517,90.287441 98.579833,91.702432 99.295972,92.418924 L 103.24708,96.370035 C 103.96357,97.086527 104.54954,98.501518 104.54954,99.514696 V 135.80106 C 104.54954,136.81424 105.37857,137.64292 106.39174,137.64292 H 184.32106 C 185.33424,137.64292 186.16326,138.47195 186.16326,139.48512 V 140.99572 C 186.16326,142.00854 186.74923,143.42389 187.46572,144.14003 L 194.7079,151.3822 C 195.42403,152.09904 196.01035,153.51404 196.01035,154.52721 V 163.35513 C 196.01035,164.3683 196.83938,165.19733 197.8522,165.19733 H 217.23134 C 218.24452,165.19733 219.07355,164.3683 219.07355,163.35513 V 149.27612 C 219.07355,148.26294 219.90258,147.43426 220.9154,147.43426 H 227.58784' },
    { col: '#38397e', path: 'M 241.50573,0.8443388 H 180.35876 C 179.34558,0.8443388 177.93059,1.4303027 177.21445,2.1467943 L 169.29812,10.062775 C 168.58163,10.779266 167.16663,11.36523 166.15346,11.36523 H 110.6975 C 109.68432,11.36523 108.26933,11.951547 107.55319,12.668039 L 70.17215,50.048724 C 69.455659,50.765215 68.869695,52.179854 68.869695,53.193385 V 71.753729 C 68.869695,72.766907 69.455659,74.181898 70.17215,74.89839 L 73.12737,77.853257' },
    { col: '#38397e', path: 'M 60.805937,0.8537578 V 63.689829 C 60.805937,64.703006 61.391901,66.118351 62.108393,66.83449 L 80.970009,85.696106 C 81.6865,86.412598 83.101492,86.998914 84.11467,86.998914 H 89.835314' },
    { col: '#38397e', path: 'M 50.567127,155.50014 V 114.20327 C 50.567127,113.19044 51.153091,111.7751 51.869583,111.05896 L 57.079052,105.84949 C 57.795191,105.133 58.381507,103.71801 58.381507,102.70483 V 88.840664 C 58.381507,87.827486 59.210535,86.998811 60.22336,86.998811 H 125.43468' },
    { col: '#38397e', path: 'M 70.336087,86.999023 H 65.282545 C 64.269368,86.999023 62.854376,86.413059 62.137884,85.696567 L 61.672923,85.231606 C 60.956432,84.515115 59.54144,83.929151 58.528262,83.929151 H 9.6805356 C 8.6677106,83.929151 7.8386828,84.758179 7.8386828,85.771004 V 101.46785' },
    { col: '#38397e', path: 'M 243.1949,99.980893 V 94.967921 C 243.1949,93.954743 242.36587,93.125715 241.35269,93.125715 H 224.78625 C 223.77307,93.125715 222.35808,92.539751 221.64194,91.82326 L 208.16654,78.347855 C 207.45005,77.631716 206.03505,77.045399 205.02188,77.045399 H 202.03526 C 201.02208,77.045399 199.60709,77.631716 198.8906,78.347855 L 192.15642,85.082735 C 191.43993,85.798874 190.02494,86.385191 189.01176,86.385191 L 173.89065,86.384838 C 172.87747,86.384838 171.46248,86.971154 170.74599,87.687646 L 147.31414,111.1195 C 146.598,111.83599 145.18265,112.42195 144.16983,112.42195 H 107.00575 C 105.99257,112.42195 105.16354,111.59293 105.16354,110.57975 V 99.260168 C 105.16354,98.247343 104.57758,96.832351 103.86109,96.11586 L 100.52381,92.778582 C 99.80767,92.06209 99.221353,90.647099 99.221353,89.633921 V 89.455063 C 99.221353,88.441885 100.05038,87.61321 101.06356,87.61321 H 125.33185' },
    { col: '#008d58', path: 'M 235.88351,92.511633 H 225.04053 C 224.02735,92.511633 222.61236,91.925669 221.89622,91.209177 L 208.1139,77.426856 C 207.39741,76.710717 205.98242,76.1244 204.96924,76.1244 H 200.2459 C 199.23307,76.1244 197.81773,76.710717 197.10159,77.426856 L 191.902,82.626447 C 191.18551,83.342939 189.77052,83.928903 188.75734,83.928903 H 59.609278 C 58.5961,83.928903 57.767072,84.75793 57.767072,85.770755 V 102.45079 C 57.767072,103.46362 57.181108,104.87896 56.464617,105.5951 L 51.2555,110.80457 C 50.539009,111.52071 49.953045,112.93605 49.953045,113.94923 V 155.5001' },
    { col: '#e3051b', path: 'M 25.55113,83.314853 H 9.5576 C 8.27454,83.314853 7.22432,84.364723 7.22432,85.648123 V 88.844293' },
    { col: '#e3051b', path: 'M 203.84462,75.510323 H 199.99158 C 198.9784,75.510323 197.56341,76.096643 196.84727,76.812783 L 191.64768,82.012373 C 190.93154,82.728863 189.5162,83.314823 188.50337,83.314823 H 25.55109' },
    { col: '#76b82a', path: 'M 60.19186,0.892387 V 63.944005 C 60.19186,64.957536 60.77782,66.372174 61.49432,67.088666 L 75.18985,80.784203 C 75.90635,81.500693 77.32134,82.087013 78.33452,82.087013 L 188.86297,82.086663 C 189.87614,82.086663 191.29113,81.500693 192.00763,80.784203 L 196.59268,76.198803 C 197.30917,75.482303 198.72416,74.896343 199.73734,74.896343 H 203.84473' },
    { col: '#892e23', path: 'M 180.50382,85.156853 H 98.60752 C 97.59434,85.156853 96.76531,85.985883 96.76531,86.999063 V 88.914643 C 96.76531,89.927463 97.35163,91.342813 98.06777,92.058953 L 102.63307,96.624243 C 103.34956,97.340743 103.93552,98.755733 103.93552,99.768913 V 166.29821' },
    { col: '#ea516d', path: 'M 103.32159,146.93226 V 100.02305 C 103.32159,99.009873 102.73563,97.594883 102.01913,96.878393 L 97.45384,92.313443 C 96.73735,91.597303 96.15138,90.181963 96.15138,89.169133 V 87.613033 C 96.15138,86.599853 95.32235,85.770833 94.30918,85.770833 H 68.11578' },
    { col: '#16bae7', path: 'M 187.87145,0.230188 H 180.10434 C 179.09116,0.230188 177.67617,0.816152 176.96003,1.532644 L 169.0437,9.448624 C 168.32756,10.165116 166.91222,10.751079 165.89939,10.751079 H 110.44308 C 109.43025,10.751079 108.01491,11.337396 107.29877,12.053888 L 69.5579,49.794406 C 68.84176,50.510898 68.25544,51.92589 68.25544,52.939067 V 70.017039 C 68.25544,71.030217 68.84176,72.445209 69.5579,73.161343 L 76.56689,80.170333 C 77.28338,80.886823 78.69802,81.472793 79.71155,81.472793 H 188.60876 C 189.62193,81.472793 191.03692,80.886823 191.75342,80.170333 L 195.50697,76.416423' },
    { col: '#f0aa00', path: 'M 29.55438,133.58565 V 99.315413 C 29.55438,98.302233 30.38341,97.473203 31.39623,97.473203 H 55.31104 C 56.32421,97.473203 57.15324,96.644533 57.15324,95.631353 V 86.384693 C 57.15324,85.371873 57.98227,84.542843 58.99509,84.542843 L 189.01169,84.543193 C 190.02487,84.543193 191.43986,83.956873 192.15635,83.240383 L 198.0428,77.353933 C 198.75894,76.637793 199.34526,75.222453 199.34526,74.209623 V 13.207295 C 199.34526,12.194117 200.17429,11.365442 201.18711,11.365442 H 224.04888' }
])
    .map(({col, path}) => ({
        col,
        path: path
            .split(/ (?=[MmVvHhLlCcQqAa])/gm)
            .map(command => command
                .split(/[\, ]/gm)
                .map((commandPart, i) => i !== 0 ? parseFloat(commandPart) : commandPart)
            )
    }));

function App() {
    const [resize, setResize] = useState<'none' | 'top' | 'top-right' | 'right' | 'bottom-right' | 'bottom' | 'bottom-left' | 'left' | 'top-left'>('none');
    const [[rectX, rectY], setRectXY] = useState([800, 500]);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [dragEnabled, setDragEnabled] = useState(false);
    const [[dragX, dragY], setDragXY] = useState([0, 0]);
    const [zoom, setZoom] = useState(0.2);

    function resizeX(x: number, relative: boolean = false, rect: DOMRect = document.body.getBoundingClientRect()) {
        const zoomEnd = 1 - zoom;
        const zoomInv = 1/zoom;
        const zoomMiddleInv = 1/(1-zoom*2);

        const percentLinear = (x + dragX*0.25) / originalSize[0];

        const sizeLeft = rect.width/2 - rectX/2;
        const sizeMiddle = rectX;

        if(percentLinear < zoom) {
            return percentLinear*zoomInv*sizeLeft;
        }

        if(percentLinear >= zoom && percentLinear <= zoomEnd) {
            return (percentLinear - zoom) * zoomMiddleInv * sizeMiddle + sizeLeft;
        }

        if(percentLinear > zoomEnd) {
            return (percentLinear-zoomEnd)*zoomInv*sizeLeft + sizeLeft + sizeMiddle;
        }
    }

    function resizeY(y: number, relative: boolean = false, rect: DOMRect = document.body.getBoundingClientRect()) {
        const zoomEnd = 1 - zoom;
        const zoomInv = 1/zoom;
        const zoomMiddleInv = 1/(1-zoom*2);

        const percentLinear = (y + dragY*0.25) / originalSize[1];

        const sizeLeft = rect.height/2 - rectY/2;
        const sizeMiddle = rectY;


        if(percentLinear < zoom) {
            return percentLinear*zoomInv*sizeLeft;
        }

        if(percentLinear >= zoom && percentLinear <= zoomEnd) {
            return (percentLinear - zoom) * zoomMiddleInv * sizeMiddle + sizeLeft;
        }

        if(percentLinear > zoomEnd) {
            return (percentLinear-zoomEnd)*zoomInv*sizeLeft + sizeLeft + sizeMiddle;
        }
    }

    useEffect(() => {
        const screen = document.body.getBoundingClientRect();

        setRectXY([screen.width * 3/5, screen.height * 3/5]);

        document.addEventListener('wheel', (e) => {
            setZoom(zoom => Math.max(0.05, Math.min(zoom + e.deltaY*0.0001, 0.4)));
        })
    }, []);

    useEffect(() => {
        if(resize === 'none') {
            return;
        }

        const screen = document.body.getBoundingClientRect();

        const mouseMove = (e: MouseEvent) => {

            setRectXY(([x, y]) => {

                const [newX, newY] = [
                    Math.abs(e.clientX - (screen.width / 2)) * 2,
                    Math.abs(e.clientY - (screen.height / 2)) * 2
                ]

                return [
                    resize.includes('left') || resize.includes('right') ? newX : x,
                    resize.includes('top') || resize.includes('bottom') ? newY : y
                ];
            });
        }

        const mouseUp = () => {
            setResize('none');
        }

        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', mouseUp)


        return () => {
            document.removeEventListener('mousemove', mouseMove);
            document.removeEventListener('mouseup', mouseUp);
        };

    }, [resize, setResize]);

    useEffect(() => {
        if(!dragEnabled) return;

        const mouseMove = (e: MouseEvent) => {
            setDragXY(([x, y]) => [x + e.movementX, y + e.movementY]);
        };

        const mouseUp = () => {
            setDragEnabled(false);
        };

        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', mouseUp);

        return () => {
            document.removeEventListener('mousemove', mouseMove);
            document.removeEventListener('mouseup', mouseUp);
        };

    }, [dragEnabled]);

    useEffect(() => {
        if(!canvasRef.current) {
            return
        }

        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        const ctx = canvasRef.current.getContext('2d');

        if(!ctx) {
            return;
        }

        ctx.lineWidth = 3;

        svg.forEach(path => {
            ctx.strokeStyle = path.col;

            ctx.stroke(new Path2D(path.path.flatMap(([commandName, ...args], i) => {
                if(typeof commandName !== 'string') {
                    console.error('Invalid command type', commandName);
                    return [];
                }

                const relative = commandName.toLowerCase() === commandName;
    
                if(commandName.toLowerCase() === 'm') {
                    if(typeof args[0] !== 'number' || typeof args[1] !== 'number') {
                        console.error('Invalid args for command ' + commandName);
                        return [];
                    }

                    return [
                        commandName,
                        resizeX(args[0], false),
                        resizeY(args[1], false)
                    ];
                }

                if(commandName.toLowerCase() === 'h') {
                    if(typeof args[0] !== 'number') {
                        console.error('Invalid args for command ' + commandName);
                        return [];
                    }

                    return [
                        commandName,
                        resizeX(args[0], relative)
                    ];
                }

                if(commandName.toLowerCase() === 'v') {
                    if(typeof args[0] !== 'number') {
                        console.error('Invalid args for command ' + commandName);
                        return [];
                    }

                    return [
                        commandName,
                        resizeY(args[0], relative)
                    ];
                }

                if(commandName.toLowerCase() === 'l') {
                    if(typeof args[0] !== 'number' || typeof args[1] !== 'number') {
                        console.error('Invalid args for command ' + commandName);
                        return [];
                    }

                    return [
                        commandName,
                        resizeX(args[0], relative),
                        resizeY(args[1], relative)
                    ];
                }

                if(commandName.toLowerCase() === 'c') {
                    if(
                        typeof args[0] !== 'number' ||
                        typeof args[1] !== 'number' ||
                        typeof args[2] !== 'number' ||
                        typeof args[3] !== 'number' ||
                        typeof args[4] !== 'number' ||
                        typeof args[5] !== 'number'
                    ) {
                        console.error('Invalid args for command ' + commandName);
                        return [];
                    }

                    return [
                        commandName,
                        resizeX(args[0], relative),
                        resizeY(args[1], relative),
                        resizeX(args[2], relative),
                        resizeY(args[3], relative),
                        resizeX(args[4], relative),
                        resizeY(args[5], relative)
                    ];
                }
    
                return [
                    commandName,
                    ...args
                ];

            }).join(' ')));
        });

    }, [canvasRef, dragX, dragY, rectX, rectY, zoom]);

    return (
        <div>
            <div className="App" style={{
                width: `${rectX}px`,
                transform: `translate(${Math.min(-rectX/2, -20)}px, ${Math.min(-rectY/2, -20)}px)`,
            }}>
                <h1>Experiment: Subway Zoom</h1>
                <h2>Scroll and Resize rectangle to change zoom levels</h2>
                <div className='resizer' style={{
                    width: `${rectX}px`,
                    height: `${rectY}px`,
                    clipPath: `polygon(${-8/rectX*100}% ${-8/rectY*100}%, ${-8/rectX*100}% ${(rectY-8)/rectY*100}%, ${8/rectX*100}% ${(rectY+8)/rectY*100}%, ${8/rectX*100}% ${8/rectY*100}%, ${(rectX-8)/rectX*100}% ${8/rectY*100}%, ${(rectX-8)/rectX*100}% ${(rectY-8)/rectY*100}%, ${8/rectX*100}% ${(rectY-8)/rectY*100}%, ${8/rectX*100}% ${(rectY+8)/rectY*100}%, ${(rectX+8)/rectX*100}% ${(rectY+8)/rectY*100}%, ${(rectX+8)/rectX*100}% ${-8/rectY*100}%)`
                }}>
                    <div className="resize--top" onMouseDown={() => setResize('top')}></div>
                    <div className="resize--top-right" onMouseDown={() => setResize('top-right')}></div>
                    <div className="resize--right" onMouseDown={() => setResize('right')}></div>
                    <div className="resize--bottom-right" onMouseDown={() => setResize('bottom-right')}></div>
                    <div className="resize--bottom" onMouseDown={() => setResize('bottom')}></div>
                    <div className="resize--bottom-left" onMouseDown={() => setResize('bottom-left')}></div>
                    <div className="resize--left" onMouseDown={() => setResize('left')}></div>
                    <div className="resize--top-left" onMouseDown={() => setResize('top-left')}></div>
                </div>
                <p>Leonard Goldstein | Fork this on GitHub | Impressum</p>
            </div>
            <canvas className='canvas' ref={canvasRef} onMouseDown={() => setDragEnabled(true)}></canvas>
        </div>
    )
}

export default App
