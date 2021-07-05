#include <Windows.h>
#include <stdint.h>

#define local_var static
#define global_var static
typedef uint8_t uint8;
typedef uint16_t uint16;
typedef uint32_t uint32;
typedef uint64_t uint64;

global_var bool Running = true;
global_var BITMAPINFO BitMapInfo;
global_var void *BITMAPMEMORY;
global_var int BitmapWidth;
global_var int BitmapHeight;

static void ResizeDIBSection(int Width, int Height)
{
    BitmapWidth = Width;
    BitmapHeight = Height;
    if(BITMAPMEMORY){
        VirtualFree(BITMAPMEMORY, 0, MEM_RELEASE);
    }
    BitMapInfo.bmiHeader.biSize = sizeof(BitMapInfo.bmiHeader);
    BitMapInfo.bmiHeader.biWidth = BitmapWidth;
    BitMapInfo.bmiHeader.biHeight = BitmapHeight;
    BitMapInfo.bmiHeader.biPlanes = 1;
    BitMapInfo.bmiHeader.biBitCount = 32;
    BitMapInfo.bmiHeader.biCompression = BI_RGB;
    
    int BITMAPMEMORYSIZE = (BitmapWidth * BitmapHeight) * 4;
    BITMAPMEMORY = VirtualAlloc(0, BITMAPMEMORYSIZE, MEM_COMMIT, PAGE_READWRITE);

    int Pitch = Width * 4;
    uint8 *Row = (uint8 *)BITMAPMEMORY;
    for(int Y = 0; Y < BitmapHeight; ++Y){
        uint8 *Pixel = (uint8 *)Row;
        for(int X = 0; X < BitmapWidth; ++X){//39
            *Pixel = X; //Blue
            ++Pixel;
            *Pixel = Y; //Green
            ++Pixel;
            *Pixel = 0; //Red
            ++Pixel;
            *Pixel = 0;
            ++Pixel;
        }
        Row += Pitch;
    }
}
static void Win32UpdateWindow(HDC DeviceContext, RECT *WindowRect, int X, int Y, int Width, int Height){
    int WindowWidth = WindowRect->right - WindowRect->left;
    int WindowHeight = WindowRect->bottom - WindowRect->top;
    StretchDIBits(DeviceContext, 0, 0, BitmapWidth, BitmapHeight, 0, 0, WindowWidth, WindowHeight,
      BITMAPMEMORY,
      &BitMapInfo,
      DIB_RGB_COLORS, SRCCOPY
    );
}

LRESULT CALLBACK MainWindowCallback(
   HWND   Window,
   UINT   Message,
   WPARAM WParam,
   LPARAM LParam
){
    LRESULT Result = 0;
    switch (Message){
        case WM_SIZE:
            {   RECT ClientRect;
                GetClientRect(
                    Window, &ClientRect
                );

                int Height = ClientRect.bottom - ClientRect.top;
                int Width = ClientRect.right - ClientRect.left;
                ResizeDIBSection(Width, Height);}
        break;
        case WM_DESTROY:
            {Running = false;}
        break;
        case WM_CLOSE:
            {Running = false;}
        break;
        case WM_ACTIVATEAPP:
        {}
        break;
        case WM_PAINT:
        {
            PAINTSTRUCT Paint;
            HDC BitmapDeviceContext = BeginPaint(Window, &Paint);
            int X = Paint.rcPaint.left;
            int Y = Paint.rcPaint.top;
            LONG Height = Paint.rcPaint.bottom - Paint.rcPaint.top;
            LONG Width = Paint.rcPaint.right - Paint.rcPaint.left;
            RECT ClientRect;
                GetClientRect(
                    Window, &ClientRect
                );
            Win32UpdateWindow(BitmapDeviceContext, &ClientRect, X, Y, Width, Height);
            EndPaint(Window, &Paint);}
        break;
        default:
        {Result = DefWindowProc(Window, Message, WParam, LParam);}
        break;
    }
    return(Result);
}
INT WINAPI WinMain(HINSTANCE Instance, HINSTANCE PrevInstance,
    PSTR CommandLine, INT CommandShow)
{
    MessageBoxW(0, L"Welcome", L"DAS", MB_OK|MB_ICONINFORMATION);
    WNDCLASS WindowClass = {};
    WindowClass.style = CS_OWNDC; 
    WindowClass.lpfnWndProc = MainWindowCallback; 
    //WindowClass.cbClsExtra = ; 
    //WindowClass.cbWndExtra = ; 
    WindowClass.hInstance = Instance; 
    //WindowClass.hIcon = ; 
    //WindowClass.hCursor = ; 
    //WindowClass.hbrBackground= ; 
    //WindowClass.lpszMenuName = ; 
    WindowClass.lpszClassName = "AIEclass";

    if(RegisterClass(&WindowClass)){
        HWND WindowHandle = CreateWindowEx(
            0, 
            WindowClass.lpszClassName, 
            "KEKAROO", 
            WS_OVERLAPPEDWINDOW|WS_VISIBLE, 
            CW_USEDEFAULT, 
            CW_USEDEFAULT, 
            CW_USEDEFAULT, 
            CW_USEDEFAULT, 
            0, 
            0, 
            Instance, 
            0);
            if(WindowHandle){
                while(Running)
                {
                    MSG Message;
                    BOOL MessageResult = GetMessage(&Message, 0, 0, 0);
                    if(MessageResult > 0)
                    {
                        TranslateMessage(&Message);
                        DispatchMessage(&Message);
                }
                else{
                    break;
                }
                }
            }
    }
    else{
    
    };

    return 0;
}
