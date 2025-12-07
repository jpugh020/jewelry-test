import {Sidebar, SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem} from '@/components/ui/sidebar';
  import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from '@/components/ui/dropdown-menu';
  import { GemIcon, Home, ShoppingCart, Search, HeartHandshake, PanelLeftClose, PanelLeftOpen, User, ChevronUp } from "lucide-react";
  import {Button } from '@/components/ui/button';
  import { Link, useLocation } from 'react-router-dom';

export default function Nav({isOpen, setIsOpen}: {isOpen: boolean; setIsOpen: (value: boolean) => void}) {
    const location = useLocation();
    
    function toggleSidebar() {
        setIsOpen(!isOpen);
    }

    const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Cart",
    url: "/cart",
    icon: ShoppingCart,
  },
  {
    title: "Shop",
    url: "/shop",
    icon: GemIcon,
  },
  {
    title: "Search",
    url: "/search",
    icon: Search,
  },
  {
    title: "About Us",
    url: "/about",
    icon: HeartHandshake,
  },
]
    return (
    <>
    
        <Sidebar collapsible='icon' >
         <SidebarContent className="bg-[#324c39]!">
        <SidebarGroup className="">
          <div className="flex justify-center">
            <a href="#"  onMouseEnter={()=>{
              document.getElementById("label")?.classList.add("bg-[#ebc9aa]!");
              document.getElementById("label")?.classList.add("text-[#324c39]!");

            }} onMouseLeave={()=>{
              document.getElementById("label")?.classList.remove("bg-[#ebc9aa]!");
              document.getElementById("label")?.classList.remove("text-[#324c39]!");
            }}>
          <SidebarGroupLabel id="label" className="text-[#f5f5f5] font-sans text-3xl justify-self-center py-5!">Bejeweled </SidebarGroupLabel>
          </a>
          </div>
          <SidebarGroupContent>
            <div className="flex w-full justify-center p-0">
          <Button className=" w-10 hover:cursor-pointer hover:bg-[#ebc9aa]! hover:text-[#324c39] text-[#f5f5f5] " onClick={toggleSidebar}>{isOpen ? <PanelLeftClose /> : <PanelLeftOpen />}</Button>
          </div>
            <SidebarMenu>
                
              {items.map((item, idx) => {
                const isActive = location.pathname === item.url;
                return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className={`${isActive ? 'bg-[#ebc9aa]!' : ''}`} id={"anchor" + idx.toString()} onMouseEnter={()=>{
                      if (!isActive) {
                        const anchorName: string = "anchor" + idx.toString();
                        const iconName:string = "icon" + idx.toString();
                        const textName: string = "text" + idx.toString();
                        const anchor: HTMLElement | null = document.getElementById(anchorName);
                        const icon: HTMLElement | null = document.getElementById(iconName);
                        const text: HTMLElement | null = document.getElementById(textName);
                       
                          anchor?.classList.add("bg-[#ebc9aa]!")
                          text?.classList.add("text-[#324c39]!");
                          icon?.classList.add("text-[#324c39]!");
                      }
                    }} onMouseLeave={()=>{
                      if (!isActive) {
                        const anchorName: string = "anchor" + idx.toString();
                        const iconName:string = "icon" + idx.toString();
                        const textName: string = "text" + idx.toString();
                        const anchor: HTMLElement | null = document.getElementById(anchorName);
                        const icon: HTMLElement | null = document.getElementById(iconName);
                        const text: HTMLElement | null = document.getElementById(textName);
                       
                          anchor?.classList.remove("bg-[#ebc9aa]!")
                          text?.classList.remove("text-[#324c39]!");
                          icon?.classList.remove("text-[#324c39]!");
                      }
                    }}>
                      <item.icon className={`${isActive ? 'text-[#324c39]' : 'text-[#f5f5f5]'}`} id={"icon" + idx.toString()}/>
                      <span className={`${isActive ? 'text-[#324c39]' : 'text-[#f5f5f5]'}`} id={"text" + idx.toString()}>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-[#324c39]!">
        <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton 
                    className="bg-[#324c39]! text-[#f5f5f5] hover:bg-[#ebc9aa]! hover:text-[#324c39]!"
                    id="footerButton"
                    onMouseEnter={()=>{
                      const btn = document.getElementById("footerButton");
                      btn?.classList.add("bg-[#ebc9aa]!");
                      btn?.classList.add("text-[#324c39]!");
                    }}
                    onMouseLeave={()=>{
                      const btn = document.getElementById("footerButton");
                      btn?.classList.remove("bg-[#ebc9aa]!");
                      btn?.classList.remove("text-[#324c39]!");
                    }}
                  >
                    <User />
                    <span className="text-[#f5f5f5]">Account</span>
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem>
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={toggleSidebar}>
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
      </SidebarFooter>
        </Sidebar>
        
        
        </>)
}