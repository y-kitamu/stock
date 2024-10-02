# 現在のユーザーが管理者権限を持っていない場合に、スクリプトを管理者権限で再実行するための処理です。
if (!([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole("Administrators")) { Start-Process powershell.exe "-File `"$PSCommandPath`"" -Verb RunAs; exit }

# WSL 2 インスタンスの IP アドレスを取得します。
# bash.exe を使って、ip r コマンドを実行し、結果からIPアドレスを抽出します。
# IP アドレスが取得できない場合、スクリプトは終了します。
$ip =  wsl -e hostname -I
if( ! $ip ){
  echo "The Script Exited, the ip address of WSL 2 cannot be found";
  exit;
}
$hostip =  netsh interface ipv4 show ipaddresses | Where-Object{$_ -match "Dhcp"} | ForEach-Object{($_ -split  "\s+")[4]}

# 通信を許可するポート番号のリストを指定します。
# このスクリプトでは、22, 3000, 18000 の3つのポートを指定しています。
$listenport="2222";
$connectport="22";

# 以前に作成されたファイアウォールの例外ルールを削除します。
Remove-NetFireWallRule -DisplayName 'WSL 2 Firewall Unlock';

# New-NetFireWallRule コマンドを使用して、指定したポート番号に対するインバウンドおよびアウトバウンドのファイアウォール例外ルールを作成します。
New-NetFirewallRule -DisplayName 'WSL 2 Firewall Unlock' -Direction Outbound -Profile Any -Action Allow -LocalPort 2222 -Protocol TCP;
New-NetFirewallRule -DisplayName 'WSL 2 Firewall Unlock' -Direction Inbound -Profile Any -Action Allow -LocalPort 2222 -Protocol TCP;

# netsh interface portproxy コマンドを使用して、ポートプロキシの設定を行います。
# 指定したポート番号に対して、IP アドレスを介しての接続を許可します。
netsh interface portproxy add v4tov4 listenport=$listenport listenaddress=$hostip connectport=$connectport connectaddress=$ip;
# IPaddressを指定しないとエラーになった
# netsh interface portproxy add v4tov4 listenport=$listenport listenaddress=* connectport=$connectport connectaddress=$ip;

# 作成されたポートプロキシの設定を表示します。
netsh interface portproxy show v4tov4;

# port forwardの設定削除
# netsh interface portproxy delete v4tov4 listenport=2222 
