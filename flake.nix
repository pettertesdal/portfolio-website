{
  description = "Java and Node.js development environment";

  inputs = {
    nixpkgs.url = "nixpkgs/nixos-unstable";
  };

  outputs = { self, nixpkgs }: 
    let
      system = "x86_64-linux"; # Change to "aarch64-linux" for ARM devices
      pkgs = import nixpkgs { inherit system; };
    in {
      devShells.${system}.default = pkgs.mkShell {
        buildInputs = with pkgs; [
          # Java & Build Tools
          openjdk17
          maven
          gradle

          # Node.js & Package Managers
          nodejs_20
          
          docker
        ];

        shellHook = ''
          echo "Welcome to personal-website project directory"
          echo "Java, node, npm and docker is configured"
          java -version
          node -v
          npm -v
        '';
      };
    };
}

